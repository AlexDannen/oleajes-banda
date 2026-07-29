"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AnalyticsSummary } from "@/lib/analytics";

const categoryNames = {
  music: "Música",
  video: "Videos",
  social: "Redes",
};

function number(value: number) {
  return new Intl.NumberFormat("es-CL").format(value);
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(
    new Date(`${value}T12:00:00`),
  );
}

function fullDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function monthName(value: string) {
  const label = new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}-01T12:00:00`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/stats", { cache: "no-store" });
      if (response.status === 401) {
        setNeedsLogin(true);
        setStats(null);
        return;
      }
      if (!response.ok) throw new Error("No se pudieron cargar las estadísticas.");
      const nextStats = (await response.json()) as AnalyticsSummary;
      setStats(nextStats);
      setSelectedMonth((current) =>
        nextStats.monthly.some((month) => month.month === current)
          ? current
          : (nextStats.monthly.at(-1)?.month ?? ""),
      );
      setNeedsLogin(false);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const activeMonth = useMemo(
    () => stats?.monthly.find((month) => month.month === selectedMonth) ?? null,
    [selectedMonth, stats],
  );

  const selectedDays = useMemo(
    () =>
      (stats?.daily ?? [])
        .filter((day) => day.date.startsWith(selectedMonth))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [selectedMonth, stats],
  );

  const maxMonthlyValue = useMemo(
    () =>
      Math.max(
        1,
        ...(stats?.monthly.map((month) => Math.max(month.views, month.clicks)) ?? [1]),
      ),
    [stats],
  );

  async function login(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "No se pudo iniciar sesión.");
      setPassword("");
      await loadStats();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Ocurrió un error.");
    } finally {
      setSubmitting(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setStats(null);
    setNeedsLogin(true);
  }

  if (loading && !stats && !needsLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b0f] text-[#7ec8e3]">
        <p className="font-mono text-xs uppercase tracking-[0.3em]">Cargando señal...</p>
      </main>
    );
  }

  if (needsLogin) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b0f] px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(74,158,187,0.14),transparent_45%)]" />
        <form onSubmit={login} className="relative w-full max-w-md border border-[#2d3d4f] bg-[#0d1520]/90 p-8 shadow-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#4a9ebb]">Acceso privado</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#c5d1de]">Oleajes Admin</h1>
          <p className="mt-3 text-sm leading-6 text-[#7a8a9a]">Ingresa tu contraseña para continuar.</p>
          <label className="mt-8 block text-xs uppercase tracking-wider text-[#7a8a9a]" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            autoFocus
            className="mt-2 w-full border border-[#2d3d4f] bg-[#080b0f] px-4 py-3 text-[#c5d1de] outline-none transition focus:border-[#4a9ebb]"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-[#4a9ebb] px-4 py-3 text-sm font-bold uppercase tracking-wider text-[#080b0f] transition hover:bg-[#7ec8e3] disabled:opacity-50"
          >
            {submitting ? "Ingresando..." : "Entrar al panel"}
          </button>
          <Link href="/" className="mt-6 block text-center text-xs text-[#7a8a9a] hover:text-[#4a9ebb]">← Volver a la landing</Link>
        </form>
      </main>
    );
  }

  if (!stats) return null;

  const cards = [
    ["Visitas totales", stats.totals.pageViews],
    ["Visitantes únicos", stats.totals.uniqueVisitors],
    ["Clics totales", stats.totals.clicks],
    ["Visitas hoy", stats.totals.viewsToday],
  ] as const;

  return (
    <main className="min-h-screen bg-[#080b0f] px-4 py-8 text-[#c5d1de] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-[#2d3d4f] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[#4a9ebb]">Panel de estadísticas</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold sm:text-5xl">Oleajes</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => void loadStats()} className="border border-[#2d3d4f] px-4 py-2 text-xs uppercase tracking-wider text-[#7ec8e3] hover:border-[#4a9ebb]">Actualizar</button>
            <button onClick={() => void logout()} className="border border-[#2d3d4f] px-4 py-2 text-xs uppercase tracking-wider text-[#7a8a9a] hover:border-red-400 hover:text-red-400">Salir</button>
          </div>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => (
            <article key={label} className="border border-[#2d3d4f] bg-[#0d1520] p-5">
              <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">{label}</p>
              <p className="mt-3 font-mono text-3xl text-[#7ec8e3]">{number(value)}</p>
            </article>
          ))}
        </section>

        <section className="mb-6 border border-[#2d3d4f] bg-[#0d1520] p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">Período seleccionado</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {activeMonth ? monthName(activeMonth.month) : "Sin actividad mensual"}
              </h2>
            </div>
            <label className="text-xs uppercase tracking-wider text-[#7a8a9a]">
              Ver mes
              <select
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                disabled={!stats.monthly.length}
                className="mt-2 block min-w-56 border border-[#2d3d4f] bg-[#080b0f] px-4 py-3 text-sm normal-case text-[#c5d1de] outline-none focus:border-[#4a9ebb] disabled:opacity-50"
              >
                {[...stats.monthly].reverse().map((month) => (
                  <option key={month.month} value={month.month}>
                    {monthName(month.month)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Visitas del mes", activeMonth?.views ?? 0],
              ["Visitantes únicos", activeMonth?.uniqueVisitors ?? 0],
              ["Clics del mes", activeMonth?.clicks ?? 0],
              ["Días con actividad", selectedDays.length],
            ].map(([label, value]) => (
              <div key={label} className="border border-[#2d3d4f]/70 bg-[#080b0f] p-4">
                <p className="text-[10px] uppercase tracking-wider text-[#7a8a9a]">{label}</p>
                <p className="mt-2 font-mono text-2xl text-[#7ec8e3]">{number(Number(value))}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="border border-[#2d3d4f] bg-[#0d1520] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">Evolución mensual</p>
                <h2 className="mt-1 text-xl font-semibold">Últimos 12 meses</h2>
              </div>
              <div className="flex gap-4 text-[10px] uppercase tracking-wider text-[#7a8a9a]">
                <span><i className="mr-1 inline-block h-2 w-2 bg-[#4a9ebb]" /> Visitas</span>
                <span><i className="mr-1 inline-block h-2 w-2 bg-[#b08cff]" /> Clics</span>
              </div>
            </div>

            {stats.monthly.length ? (
              <div className="mt-8 flex h-64 items-end gap-2 border-b border-[#2d3d4f] px-1">
                {stats.monthly.map((month) => (
                  <button
                    type="button"
                    key={month.month}
                    onClick={() => setSelectedMonth(month.month)}
                    className={`group relative flex h-full min-w-0 flex-1 items-end justify-center gap-1 border-x border-transparent px-1 transition ${selectedMonth === month.month ? "bg-[#4a9ebb]/5" : "hover:bg-white/[0.02]"}`}
                    aria-label={`Ver estadísticas de ${monthName(month.month)}`}
                  >
                    <span className="w-1/3 min-w-1 bg-[#4a9ebb] transition-opacity group-hover:opacity-80" style={{ height: `${Math.max(2, (month.views / maxMonthlyValue) * 100)}%` }} />
                    <span className="w-1/3 min-w-1 bg-[#b08cff] transition-opacity group-hover:opacity-80" style={{ height: `${Math.max(2, (month.clicks / maxMonthlyValue) * 100)}%` }} />
                    <div className="pointer-events-none absolute bottom-8 z-10 hidden whitespace-nowrap border border-[#2d3d4f] bg-[#080b0f] p-2 text-xs shadow-xl group-hover:block">
                      {monthName(month.month)} · {month.views} visitas · {month.clicks} clics
                    </div>
                    <span className={`absolute -bottom-6 text-[9px] sm:text-[10px] ${selectedMonth === month.month ? "text-[#7ec8e3]" : "text-[#596979]"}`}>
                      {month.month.slice(5, 7)}/{month.month.slice(2, 4)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-8 flex h-64 items-center justify-center border border-dashed border-[#2d3d4f] text-sm text-[#7a8a9a]">Todavía no hay actividad mensual.</div>
            )}
          </section>

          <section className="border border-[#2d3d4f] bg-[#0d1520] p-5 sm:p-7">
            <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">Clics por sección</p>
            <h2 className="mt-1 text-xl font-semibold">Interacciones</h2>
            <div className="mt-8 space-y-6">
              {(Object.keys(categoryNames) as Array<keyof typeof categoryNames>).map((category) => {
                const value = activeMonth?.categoryTotals[category] ?? 0;
                const percentage = activeMonth?.clicks ? (value / activeMonth.clicks) * 100 : 0;
                return (
                  <div key={category}>
                    <div className="mb-2 flex justify-between text-sm"><span>{categoryNames[category]}</span><span className="font-mono text-[#7ec8e3]">{number(value)}</span></div>
                    <div className="h-2 bg-[#080b0f]"><div className="h-full bg-gradient-to-r from-[#4a9ebb] to-[#7ec8e3]" style={{ width: `${percentage}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="mt-6 border border-[#2d3d4f] bg-[#0d1520] p-5 sm:p-7">
          <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">Ranking</p>
          <h2 className="mt-1 text-xl font-semibold">
            Contenidos más populares · {activeMonth ? monthName(activeMonth.month) : "Sin período"}
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-[#2d3d4f] text-xs uppercase tracking-wider text-[#7a8a9a]"><tr><th className="py-3">Contenido</th><th className="py-3">Sección</th><th className="py-3 text-right">Clics</th></tr></thead>
              <tbody>
                {(activeMonth?.topLinks ?? []).map((link) => (
                  <tr key={`${link.category}:${link.label}`} className="border-b border-[#2d3d4f]/60 last:border-0"><td className="py-4">{link.label}</td><td className="py-4 text-[#7a8a9a]">{categoryNames[link.category]}</td><td className="py-4 text-right font-mono text-[#7ec8e3]">{number(link.clicks)}</td></tr>
                ))}
                {!activeMonth?.topLinks.length && <tr><td colSpan={3} className="py-10 text-center text-[#7a8a9a]">No hay clics registrados en este mes.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 border border-[#2d3d4f] bg-[#0d1520] p-5 sm:p-7">
          <p className="text-xs uppercase tracking-wider text-[#7a8a9a]">Detalle cronológico</p>
          <h2 className="mt-1 text-xl font-semibold">
            Actividad por fecha · {activeMonth ? monthName(activeMonth.month) : "Sin período"}
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-[#2d3d4f] text-xs uppercase tracking-wider text-[#7a8a9a]">
                <tr>
                  <th className="py-3">Fecha</th>
                  <th className="py-3 text-right">Visitas</th>
                  <th className="py-3 text-right">Visitantes</th>
                  <th className="py-3 text-right">Clics</th>
                </tr>
              </thead>
              <tbody>
                {selectedDays.map((day) => (
                  <tr key={day.date} className="border-b border-[#2d3d4f]/60 last:border-0">
                    <td className="py-4 capitalize">
                      <span className="hidden sm:inline">{fullDate(day.date)}</span>
                      <span className="sm:hidden">{shortDate(day.date)}</span>
                    </td>
                    <td className="py-4 text-right font-mono text-[#7ec8e3]">{number(day.views)}</td>
                    <td className="py-4 text-right font-mono text-[#c5d1de]">{number(day.uniqueVisitors)}</td>
                    <td className="py-4 text-right font-mono text-[#b08cff]">{number(day.clicks)}</td>
                  </tr>
                ))}
                {!selectedDays.length && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-[#7a8a9a]">
                      No hay actividad diaria registrada en este mes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="flex flex-col gap-2 py-8 text-xs text-[#596979] sm:flex-row sm:justify-between">
          <Link href="/" className="hover:text-[#4a9ebb]">← Volver a la landing</Link>
          <p>{stats.updatedAt ? `Última actividad: ${new Date(stats.updatedAt).toLocaleString("es-CL")}` : "Sin actividad todavía"}</p>
        </footer>
      </div>
    </main>
  );
}
