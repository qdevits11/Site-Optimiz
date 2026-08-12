#!/usr/bin/env node
/**
 * One-shot helper to obtain GOOGLE_REFRESH_TOKEN for Calendar booking.
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/google-calendar-oauth.mjs
 *
 * Then paste the authorization code when prompted.
 */

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
// Must match an authorized redirect URI on the OAuth client (Desktop or Web).
const redirectUri =
  process.env.GOOGLE_REDIRECT_URI?.trim() || "http://localhost:3456/oauth2callback";
const scope = "https://www.googleapis.com/auth/calendar";

if (!clientId || !clientSecret) {
  console.error(
    "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then re-run this script.",
  );
  process.exit(1);
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", redirectUri);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", scope);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log("\n1. Add this redirect URI to your OAuth client if missing:\n");
console.log(`   ${redirectUri}`);
console.log("\n2. Open this URL in a browser (signed in as the Optmiz calendar account):\n");
console.log(authUrl.toString());
console.log(
  "\n3. After approve, the browser lands on a URL that may fail to load: copy the full URL,",
);
console.log("   or just the `code=` query value, and paste it below.\n");

const rl = createInterface({ input, output });
const pasted = (await rl.question("Paste the redirect URL or authorization code: ")).trim();
rl.close();

let code = pasted;
try {
  if (pasted.includes("code=")) {
    code = new URL(pasted).searchParams.get("code") || pasted;
  }
} catch {
  // plain code string
}

if (!code) {
  console.error("No code provided.");
  process.exit(1);
}

const body = new URLSearchParams({
  code,
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uri: redirectUri,
  grant_type: "authorization_code",
});

const res = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body,
});

const json = await res.json();
if (!res.ok) {
  console.error("Token exchange failed:", json);
  process.exit(1);
}

console.log("\nAdd these to Vercel → Environment Variables:\n");
console.log(`GOOGLE_CLIENT_ID=${clientId}`);
console.log(`GOOGLE_CLIENT_SECRET=${clientSecret}`);
console.log(`GOOGLE_REFRESH_TOKEN=${json.refresh_token || "(missing: revoke access and retry with prompt=consent)"}`);
console.log(`GOOGLE_CALENDAR_ID=primary`);
console.log(`# Optionnel: agendas additionnels pour les disponibilités (virgules)`);
console.log(`# GOOGLE_BUSY_CALENDAR_IDS=autre@gmail.com,equipe@group.calendar.google.com`);
console.log("\nThen Redeploy.");
