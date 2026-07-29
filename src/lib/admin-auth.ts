import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "oleajes_admin";

const sessionDurationSeconds = 60 * 60 * 24 * 7;

function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV !== "production") return "oleajes-local-development-secret";
  return null;
}

export function adminIsConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && sessionSecret());
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return process.env.NODE_ENV !== "production" && password === "oleajes-local";

  const receivedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

function signature(expires: string, secret: string) {
  return createHmac("sha256", secret).update(expires).digest("base64url");
}

export function createAdminSession() {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = String(Math.floor(Date.now() / 1000) + sessionDurationSeconds);
  return {
    value: `${expires}.${signature(expires, secret)}`,
    maxAge: sessionDurationSeconds,
  };
}

export function verifyAdminSession(value: string | undefined) {
  const secret = sessionSecret();
  if (!value || !secret) return false;

  const [expires, suppliedSignature] = value.split(".");
  if (!expires || !suppliedSignature || Number(expires) < Date.now() / 1000) return false;

  const expectedSignature = signature(expires, secret);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}
