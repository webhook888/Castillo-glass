import nodemailer from "nodemailer";

const FORM_RECIPIENT = process.env.FORM_NOTIFICATION_RECIPIENT || "solutionweb386@gmail.com";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ") || "Not provided";
  return value || "Not provided";
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export async function sendFormNotification(formName, submission) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error("Email delivery is not configured. Please add the SMTP environment variables.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const fields = Object.entries(submission)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:600">${escapeHtml(formatLabel(key))}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(formatValue(value))}</td></tr>`
    )
    .join("");
  const senderName = `${submission.firstName || ""} ${submission.lastName || ""}`.trim() || "Website visitor";

  await transporter.sendMail({
    from: SMTP_FROM,
    to: FORM_RECIPIENT,
    replyTo: submission.email,
    subject: `[Castillo's Glass] New ${formName} submission from ${senderName}`,
    text: Object.entries(submission)
      .map(([key, value]) => `${formatLabel(key)}: ${formatValue(value)}`)
      .join("\n"),
    html: `<h2>New ${escapeHtml(formName)} submission</h2><table style="border-collapse:collapse">${fields}</table>`,
  });
}
