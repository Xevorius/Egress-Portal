import { NextResponse } from "next/server";

const issuerOrigin =
  process.env.UNET_ISSUER_ORIGIN ??
  process.env.NEXT_PUBLIC_UNET_ISSUER_ORIGIN ??
  "https://issuer.egress.live";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errorCode: "bad_request", message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const upstream = await fetch(`${issuerOrigin}/v1/official-account/applications`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const responseBody = await upstream.json().catch(() => ({
    success: false,
    errorCode: "bad_gateway",
    message: "The onboarding service returned an unreadable response.",
  }));

  return NextResponse.json(responseBody, { status: upstream.status });
}
