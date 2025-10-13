import nodemailer from "nodemailer"

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465),
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
})

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  const from = process.env.SMTP_FROM || `Pari Eyebrow <no-reply@pari.local>`
  return mailer.sendMail({ from, ...opts })
}


