import { createHmac, timingSafeEqual } from "crypto";

/**
 * Liens signés pour annuler / modifier une visite sans compte.
 * Secret : BOOKING_MANAGE_SECRET, sinon GOOGLE_CLIENT_SECRET, sinon SMTP_PASS.
 */

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 90; // 90 jours

export type BookingManagePayload = {
  eventId: string;
  email: string;
  exp: number;
};

function getManageSecret() {
  return (
    process.env.BOOKING_MANAGE_SECRET?.trim() ||
    process.env.GOOGLE_CLIENT_SECRET?.trim() ||
    process.env.SMTP_PASS?.trim() ||
    ""
  );
}

export function isBookingManageSecretConfigured() {
  return Boolean(getManageSecret());
}

function b64urlEncode(value: string | Buffer) {
  const buf = typeof value === "string" ? Buffer.from(value, "utf8") : value;
  return buf.toString("base64url");
}

function b64urlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(body: string) {
  const secret = getManageSecret();
  if (!secret) {
    throw new Error("Secret de gestion des visites manquant.");
  }
  return createHmac("sha256", secret).update(body).digest();
}

export function createBookingManageToken(input: {
  eventId: string;
  email: string;
  expiresInMs?: number;
}) {
  const payload: BookingManagePayload = {
    eventId: input.eventId,
    email: input.email.trim().toLowerCase(),
    exp: Date.now() + (input.expiresInMs ?? TOKEN_TTL_MS),
  };
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = b64urlEncode(sign(body));
  return `${body}.${sig}`;
}

export function verifyBookingManageToken(token: string): BookingManagePayload | null {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;

    const expected = sign(body);
    const provided = Buffer.from(sig, "base64url");
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
      return null;
    }

    const payload = JSON.parse(b64urlDecode(body)) as BookingManagePayload;
    if (!payload?.eventId || !payload?.email || !payload?.exp) return null;
    if (Date.now() > payload.exp) return null;
    return {
      eventId: String(payload.eventId),
      email: String(payload.email).trim().toLowerCase(),
      exp: Number(payload.exp),
    };
  } catch {
    return null;
  }
}
