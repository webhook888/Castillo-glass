import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";
import { sendFormNotification } from "@/lib/mailer";

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "companyName",
  "relationshipToProject",
  "projectName",
  "typeOfProject",
  "zipCode",
];

export async function POST(request) {
  try {
    const body = await request.json();
    const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.trim());

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    await sendFormNotification("Get a Quote", body);
    const entry = await saveSubmission("quote", body);
    return NextResponse.json(
      { success: true, submission: entry },
      { status: 201 },
    );
  } catch (error) {
    console.error("QUOTE API ERROR:", error);
  
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
