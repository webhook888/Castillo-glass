import { cookies } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAuthSecret() {
  return process.env.AUTH_SECRET || "bell-air-lux-dev-secret-change-in-production";
}

function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
  };
}

function signPayload(payload) {
  const secret = getAuthSecret();
  const data = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64url")}.${signature}`;
}

function parseToken(token) {
  if (!token || !token.includes(".")) return null;

  const [encoded, signature] = token.split(".");
  const data = Buffer.from(encoded, "base64url").toString("utf-8");
  const expected = crypto.createHmac("sha256", getAuthSecret()).update(data).digest("hex");

  if (signature !== expected) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function verifySessionToken(token) {
  const payload = parseToken(token);
  if (!payload?.exp || payload.exp < Date.now()) return null;
  return payload;
}

export function createSessionToken() {
  const payload = {
    user: "admin",
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  return signPayload(payload);
}

export function validateCredentials(username, password) {
  const creds = getCredentials();
  return username === creds.username && password === creds.password;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(response, token) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

export function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
