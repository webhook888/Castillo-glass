import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";
import { sendFormNotification } from "@/lib/mailer";

const REQUIRED_FIELDS = ["firstName", "lastName", "phone", "email"];

export async function POST(request) {
  try {
    const body = await request.json();
    const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.trim());

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    await sendFormNotification("Contact Us", body);
    const entry = await saveSubmission("contact", body);
    return NextResponse.json({ success: true, submission: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
