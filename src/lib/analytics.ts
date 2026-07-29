import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type AnalyticsCategory = "music" | "video" | "social";

type DailyMetrics = {
  views: number;
  visitors: string[];
  clicks: Record<string, number>;
};

type AnalyticsStore = {
  version: 1;
  pageViews: number;
  visitors: string[];
  clicks: Record<string, number>;
  daily: Record<string, DailyMetrics>;
  updatedAt: string | null;
};

export type AnalyticsSummary = {
  totals: {
    pageViews: number;
    uniqueVisitors: number;
    clicks: number;
    viewsToday: number;
  };
  daily: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
    clicks: number;
  }>;
  monthly: Array<{
    month: string;
    views: number;
    uniqueVisitors: number;
    clicks: number;
    topLinks: Array<{
      category: AnalyticsCategory;
      label: string;
      clicks: number;
    }>;
    categoryTotals: Record<AnalyticsCategory, number>;
  }>;
  topLinks: Array<{
    category: AnalyticsCategory;
    label: string;
    clicks: number;
  }>;
  categoryTotals: Record<AnalyticsCategory, number>;
  updatedAt: string | null;
};

type RedisResult = { result: unknown; error?: string };

type DailyDetail = AnalyticsSummary["daily"][number] & {
  links: Record<string, number>;
  visitorIds?: string[];
};

function publicDaily(day: DailyDetail): AnalyticsSummary["daily"][number] {
  return {
    date: day.date,
    views: day.views,
    uniqueVisitors: day.uniqueVisitors,
    clicks: day.clicks,
  };
}

const dataFile =
  process.env.ANALYTICS_DATA_FILE ??
  path.join(process.cwd(), "data", "analytics.json");

let writeQueue: Promise<void> = Promise.resolve();

const emptyStore = (): AnalyticsStore => ({
  version: 1,
  pageViews: 0,
  visitors: [],
  clicks: {},
  daily: {},
  updatedAt: null,
});

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function shouldUseFileStorage() {
  return process.env.NODE_ENV !== "production" || Boolean(process.env.ANALYTICS_DATA_FILE);
}

function dateKey(date = new Date()) {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: process.env.ANALYTICS_TIME_ZONE ?? "America/Santiago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

function hashVisitor(visitorId: string) {
  return createHash("sha256").update(visitorId).digest("hex").slice(0, 24);
}

function parseNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function pairsToRecord(value: unknown): Record<string, number> {
  if (Array.isArray(value)) {
    const record: Record<string, number> = {};
    for (let index = 0; index < value.length; index += 2) {
      record[String(value[index])] = parseNumber(value[index + 1]);
    }
    return record;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, parseNumber(item)]),
    );
  }
  return {};
}

async function redisPipeline(commands: Array<Array<string | number>>) {
  const config = redisConfig();
  if (!config) throw new Error("Redis no está configurado");

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Redis respondió con estado ${response.status}`);
  const results = (await response.json()) as RedisResult[];
  const failed = results.find((result) => result.error);
  if (failed?.error) throw new Error(failed.error);
  return results.map((result) => result.result);
}

async function recordPageViewInRedis(visitorId: string) {
  const visitor = hashVisitor(visitorId);
  const today = dateKey();
  const updatedAt = new Date().toISOString();
  await redisPipeline([
    ["INCR", "oleajes:analytics:views"],
    ["PFADD", "oleajes:analytics:visitors", visitor],
    ["HINCRBY", `oleajes:analytics:daily:${today}`, "views", 1],
    ["PFADD", `oleajes:analytics:daily:${today}:visitors`, visitor],
    ["SADD", "oleajes:analytics:dates", today],
    ["SET", "oleajes:analytics:updatedAt", updatedAt],
  ]);
}

async function recordClickInRedis(
  visitorId: string,
  category: AnalyticsCategory,
  label: string,
) {
  const visitor = hashVisitor(visitorId);
  const today = dateKey();
  const key = `${category}:${label}`;
  const updatedAt = new Date().toISOString();
  await redisPipeline([
    ["INCR", "oleajes:analytics:clicks"],
    ["HINCRBY", "oleajes:analytics:links", key, 1],
    ["HINCRBY", `oleajes:analytics:daily:${today}`, `click:${key}`, 1],
    ["PFADD", "oleajes:analytics:visitors", visitor],
    ["PFADD", `oleajes:analytics:daily:${today}:visitors`, visitor],
    ["SADD", "oleajes:analytics:dates", today],
    ["SET", "oleajes:analytics:updatedAt", updatedAt],
  ]);
}

async function getRedisSummary(): Promise<AnalyticsSummary> {
  const [pageViewsValue, visitorsValue, clicksValue, updatedAtValue, linksValue, datesValue] =
    await redisPipeline([
      ["GET", "oleajes:analytics:views"],
      ["PFCOUNT", "oleajes:analytics:visitors"],
      ["GET", "oleajes:analytics:clicks"],
      ["GET", "oleajes:analytics:updatedAt"],
      ["HGETALL", "oleajes:analytics:links"],
      ["SMEMBERS", "oleajes:analytics:dates"],
    ]);

  const dates = (Array.isArray(datesValue) ? datesValue.map(String) : [])
    .sort((a, b) => a.localeCompare(b))
    .slice(-370);
  const dailyResults = dates.length
    ? await redisPipeline(
        dates.flatMap((date) => [
          ["HGETALL", `oleajes:analytics:daily:${date}`],
          ["PFCOUNT", `oleajes:analytics:daily:${date}:visitors`],
        ]),
      )
    : [];

  const dailyDetails: DailyDetail[] = dates.map((date, index) => {
    const metrics = pairsToRecord(dailyResults[index * 2]);
    const links = Object.fromEntries(
      Object.entries(metrics)
        .filter(([key]) => key.startsWith("click:"))
        .map(([key, value]) => [key.slice(6), value]),
    );
    return {
      date,
      views: metrics.views ?? 0,
      uniqueVisitors: parseNumber(dailyResults[index * 2 + 1]),
      clicks: sum(Object.values(links)),
      links,
    };
  });

  const monthDates = groupDatesByMonth(dates);
  const monthKeys = [...monthDates.keys()].sort((a, b) => a.localeCompare(b)).slice(-12);
  const monthlyVisitorResults = monthKeys.length
    ? await redisPipeline(
        monthKeys.map((month) => [
          "PFCOUNT",
          ...(monthDates.get(month) ?? []).map(
            (date) => `oleajes:analytics:daily:${date}:visitors`,
          ),
        ]),
      )
    : [];
  const monthly = buildMonthlySummary(
    dailyDetails,
    Object.fromEntries(
      monthKeys.map((month, index) => [month, parseNumber(monthlyVisitorResults[index])]),
    ),
  );

  return makeSummary({
    pageViews: parseNumber(pageViewsValue),
    uniqueVisitors: parseNumber(visitorsValue),
    clicks: parseNumber(clicksValue),
    links: pairsToRecord(linksValue),
    daily: dailyDetails.map(publicDaily),
    monthly,
    updatedAt: typeof updatedAtValue === "string" ? updatedAtValue : null,
  });
}

function normalizeStore(value: unknown): AnalyticsStore {
  if (!value || typeof value !== "object") return emptyStore();
  const candidate = value as Partial<AnalyticsStore>;
  return {
    version: 1,
    pageViews: Number.isFinite(candidate.pageViews) ? Number(candidate.pageViews) : 0,
    visitors: Array.isArray(candidate.visitors) ? candidate.visitors : [],
    clicks: candidate.clicks && typeof candidate.clicks === "object" ? candidate.clicks : {},
    daily: candidate.daily && typeof candidate.daily === "object" ? candidate.daily : {},
    updatedAt: typeof candidate.updatedAt === "string" ? candidate.updatedAt : null,
  };
}

async function readStore() {
  try {
    return normalizeStore(JSON.parse(await readFile(dataFile, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
    throw error;
  }
}

async function updateStore(mutator: (store: AnalyticsStore) => void) {
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    mutator(store);
    store.updatedAt = new Date().toISOString();
    await mkdir(path.dirname(dataFile), { recursive: true });
    const temporaryFile = `${dataFile}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(store), "utf8");
    await rename(temporaryFile, dataFile);
  });
  await writeQueue;
}

function dailyMetrics(store: AnalyticsStore, date: string) {
  store.daily[date] ??= { views: 0, visitors: [], clicks: {} };
  return store.daily[date];
}

async function recordPageViewInFile(visitorId: string) {
  const visitor = hashVisitor(visitorId);
  const today = dateKey();
  await updateStore((store) => {
    const daily = dailyMetrics(store, today);
    store.pageViews += 1;
    daily.views += 1;
    if (!store.visitors.includes(visitor)) store.visitors.push(visitor);
    if (!daily.visitors.includes(visitor)) daily.visitors.push(visitor);
  });
}

async function recordClickInFile(
  visitorId: string,
  category: AnalyticsCategory,
  label: string,
) {
  const visitor = hashVisitor(visitorId);
  const today = dateKey();
  const key = `${category}:${label}`;
  await updateStore((store) => {
    const daily = dailyMetrics(store, today);
    store.clicks[key] = (store.clicks[key] ?? 0) + 1;
    daily.clicks[key] = (daily.clicks[key] ?? 0) + 1;
    if (!store.visitors.includes(visitor)) store.visitors.push(visitor);
    if (!daily.visitors.includes(visitor)) daily.visitors.push(visitor);
  });
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function groupDatesByMonth(dates: string[]) {
  const groups = new Map<string, string[]>();
  for (const date of dates) {
    const month = date.slice(0, 7);
    groups.set(month, [...(groups.get(month) ?? []), date]);
  }
  return groups;
}

function linkSummary(links: Record<string, number>) {
  const categoryTotals: Record<AnalyticsCategory, number> = {
    music: 0,
    video: 0,
    social: 0,
  };
  const topLinks = Object.entries(links)
    .map(([key, clicks]) => {
      const separator = key.indexOf(":");
      const category = key.slice(0, separator) as AnalyticsCategory;
      const label = key.slice(separator + 1);
      if (category in categoryTotals) categoryTotals[category] += clicks;
      return { category, label, clicks };
    })
    .sort((a, b) => b.clicks - a.clicks);

  return { topLinks, categoryTotals };
}

function buildMonthlySummary(
  daily: DailyDetail[],
  uniqueVisitorsByMonth: Record<string, number>,
): AnalyticsSummary["monthly"] {
  const groups = new Map<
    string,
    { views: number; clicks: number; links: Record<string, number>; visitors: Set<string> }
  >();

  for (const day of daily) {
    const month = day.date.slice(0, 7);
    const group = groups.get(month) ?? {
      views: 0,
      clicks: 0,
      links: {},
      visitors: new Set<string>(),
    };
    group.views += day.views;
    group.clicks += day.clicks;
    for (const [key, clicks] of Object.entries(day.links)) {
      group.links[key] = (group.links[key] ?? 0) + clicks;
    }
    for (const visitor of day.visitorIds ?? []) group.visitors.add(visitor);
    groups.set(month, group);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, group]) => ({
      month,
      views: group.views,
      uniqueVisitors: uniqueVisitorsByMonth[month] ?? group.visitors.size,
      clicks: group.clicks,
      ...linkSummary(group.links),
    }));
}

function makeSummary(input: {
  pageViews: number;
  uniqueVisitors: number;
  clicks: number;
  links: Record<string, number>;
  daily: AnalyticsSummary["daily"];
  monthly: AnalyticsSummary["monthly"];
  updatedAt: string | null;
}): AnalyticsSummary {
  const { topLinks, categoryTotals } = linkSummary(input.links);

  const today = dateKey();
  return {
    totals: {
      pageViews: input.pageViews,
      uniqueVisitors: input.uniqueVisitors,
      clicks: input.clicks,
      viewsToday: input.daily.find((day) => day.date === today)?.views ?? 0,
    },
    daily: input.daily,
    monthly: input.monthly,
    topLinks,
    categoryTotals,
    updatedAt: input.updatedAt,
  };
}

async function getFileSummary() {
  await writeQueue;
  const store = await readStore();
  const dailyDetails: DailyDetail[] = Object.entries(store.daily)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-370)
    .map(([date, metrics]) => ({
      date,
      views: metrics.views,
      uniqueVisitors: metrics.visitors.length,
      clicks: sum(Object.values(metrics.clicks)),
      links: metrics.clicks,
      visitorIds: metrics.visitors,
    }));
  const monthly = buildMonthlySummary(dailyDetails, {});

  return makeSummary({
    pageViews: store.pageViews,
    uniqueVisitors: store.visitors.length,
    clicks: sum(Object.values(store.clicks)),
    links: store.clicks,
    daily: dailyDetails.map(publicDaily),
    monthly,
    updatedAt: store.updatedAt,
  });
}

function assertStorageConfigured() {
  if (!redisConfig() && !shouldUseFileStorage()) {
    throw new Error(
      "Configura UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN para guardar estadísticas en producción.",
    );
  }
}

export async function recordPageView(visitorId: string) {
  assertStorageConfigured();
  return redisConfig()
    ? recordPageViewInRedis(visitorId)
    : recordPageViewInFile(visitorId);
}

export async function recordClick(
  visitorId: string,
  category: AnalyticsCategory,
  label: string,
) {
  assertStorageConfigured();
  return redisConfig()
    ? recordClickInRedis(visitorId, category, label)
    : recordClickInFile(visitorId, category, label);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  assertStorageConfigured();
  return redisConfig() ? getRedisSummary() : getFileSummary();
}
