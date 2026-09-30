import { NextResponse } from "next/server";
import {
  validateCredentials,
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!(await validateCredentials(username, password))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true });
    return setSessionCookie(response, token);
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}
