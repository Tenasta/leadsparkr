"use client";
import { StytchLogin, useStytch, useStytchSession } from "@stytch/nextjs";
import { OAuthProviders, OneTapPositions, Products } from "@stytch/vanilla-js";
import { useEffect } from "react";

const config = {
  oauthOptions: {
    providers: [
      {
        one_tap: true,
        position: OneTapPositions.embedded,
        type: OAuthProviders.Google,
      },
    ],
  },
  products: [Products.oauth],
};
export default function LoginPage() {
  const stytchClient = useStytch();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/dashboard";
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      token &&
        stytchClient.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });
    }
  }, [stytchClient, session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 sm:px-6 lg:px-8">
      <StytchLogin config={config} />
    </div>
  );
}
