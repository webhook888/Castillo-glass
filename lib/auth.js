import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
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

const PASSWORD_STORE_PATH = path.join(process.cwd(), "data", "admin-password.json");

async function getStoredPassword() {
  try {
    const stored = JSON.parse(await fs.readFile(PASSWORD_STORE_PATH, "utf8"));
    return stored?.salt && stored?.hash ? stored : null;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
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

export async function validateCredentials(username, password) {
  const creds = getCredentials();
  if (username !== creds.username) return false;

  const stored = await getStoredPassword();
  if (!stored) return password === creds.password;

  const suppliedHash = hashPassword(password, stored.salt);
  return crypto.timingSafeEqual(
    Buffer.from(suppliedHash, "hex"),
    Buffer.from(stored.hash, "hex")
  );
}

export async function updatePassword(currentPassword, newPassword) {
  const { username } = getCredentials();
  if (!(await validateCredentials(username, currentPassword))) return false;

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(newPassword, salt);
  await fs.mkdir(path.dirname(PASSWORD_STORE_PATH), { recursive: true });
  await fs.writeFile(PASSWORD_STORE_PATH, JSON.stringify({ salt, hash }), { mode: 0o600 });
  return true;
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
