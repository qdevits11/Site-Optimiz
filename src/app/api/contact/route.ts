import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  phone?: string;
  email: string;
  company: string;
  challenge?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(data: ContactPayload) {
  const rows = [
    ["Nom", data.name],
    ["Téléphone", data.phone || "—"],
    ["Mail", data.email],
    ["Société", data.company],
    ["Principal enjeu", data.challenge || "—"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Nouvelle demande Optmiz</h1>
      <p style="margin-bottom: 20px;">Un visiteur a complété le formulaire de diagnostic.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #d7dfdc; background: #f0f5f4; font-weight: 600; width: 180px;">
              ${escapeHtml(label)}
            </td>
            <td style="padding: 10px 12px; border: 1px solid #d7dfdc;">
              ${escapeHtml(value).replaceAll("\n", "<br/>")}
            </td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuration email manquante (RESEND_API_KEY)." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<ContactPayload>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const challenge = body.challenge?.trim() ?? "";

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Les champs Nom, Mail et Société sont obligatoires." },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "q.devits.optmiz@gmail.com";
    const domain = (process.env.RESEND_EMAIL_DOMAIN || "optmiz.be").replaceAll('"', "");
    const from = process.env.CONTACT_FROM_EMAIL || `Optmiz <contact@${domain}>`;

    const resend = new Resend(apiKey);
    const payload = {
      from,
      to: [to],
      replyTo: email,
      subject: `Nouvelle demande diagnostic — ${company}`,
      html: buildEmailHtml({ name, phone, email, company, challenge }),
      text: [
        "Nouvelle demande Optmiz",
        "",
        `Nom: ${name}`,
        `Téléphone: ${phone || "—"}`,
        `Mail: ${email}`,
        `Société: ${company}`,
        `Principal enjeu: ${challenge || "—"}`,
      ].join("\n"),
    };

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      const message = error.message.toLowerCase().includes("not verified")
        ? "Le domaine d'envoi optmiz.be n'est pas encore vérifié dans Resend. Finalisez la configuration DNS, puis réessayez."
        : error.message;
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'envoyer le formulaire pour le moment." },
      { status: 500 },
    );
  }
}
