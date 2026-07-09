import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().or(z.literal("")).optional(),
  phone: z.string().min(6).max(40),
  message: z.string().min(8).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    // Phase 2: persist to Supabase `contact_messages` + send notification email.
    // For now, log server-side so the form works end-to-end in development.
    console.log("[contact]", parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
