import { NextResponse } from "next/server";

const issuerOrigin =
  process.env.UNET_ISSUER_ORIGIN ??
  process.env.NEXT_PUBLIC_UNET_ISSUER_ORIGIN ??
  "https://issuer.egress.live";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const { applicationId } = await params;
  const upstream = await fetch(
    `${issuerOrigin}/v1/official-account/applications/${encodeURIComponent(applicationId)}`,
    { cache: "no-store" },
  );

  const responseBody = await upstream.json().catch(() => ({
    success: false,
    errorCode: "bad_gateway",
    message: "The onboarding service returned an unreadable response.",
  }));

  return NextResponse.json(responseBody, { status: upstream.status });
}
