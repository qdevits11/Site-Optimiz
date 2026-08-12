import nodemailer from "nodemailer";
import { getMailConfig } from "@/config/mail";
import { siteConfig } from "@/lib/seo";

export function createMailTransporter() {
  const mailConfig = getMailConfig();
  return {
    mailConfig,
    transporter: nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: { user: mailConfig.user, pass: mailConfig.pass },
    }),
  };
}

export function formatVisitSlot(start: string) {
  return new Intl.DateTimeFormat("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: process.env.BOOKING_TIMEZONE?.trim() || "Europe/Brussels",
  }).format(new Date(start));
}

export async function sendClientMail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const { mailConfig, transporter } = createMailTransporter();
  await transporter.sendMail({
    from: mailConfig.from,
    to: opts.to,
    replyTo: siteConfig.email,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
}

export async function sendInternalMail(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const { mailConfig, transporter } = createMailTransporter();
  await transporter.sendMail({
    from: mailConfig.from,
    to: mailConfig.to,
    replyTo: opts.replyTo || siteConfig.email,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
