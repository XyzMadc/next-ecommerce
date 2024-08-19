import { NextRequest, NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";

export const middleware = async (req: NextRequest) => {
  const cookies = req.cookies;
  const res = NextResponse.next();

  if (!cookies.get("refreshToken")) {
    return res;
  }

  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  const token = await wixClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(token.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
};
