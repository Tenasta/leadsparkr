"use client";
import { StytchLogin, useStytch, useStytchSession } from "@stytch/nextjs";
import { OAuthProviders, OneTapPositions, Products } from "@stytch/vanilla-js";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState<string>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token"));
    if (session) {
      window.location.href = "/dashboard";
    } else if (token) {
      stytchClient.oauth
        .authenticate(token, {
          session_duration_minutes: 60,
        })
        .catch((e) => {
          console.log("error", e);
          setError(e.message);
        });
    }
  }, [stytchClient, session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 sm:px-6 lg:px-8 mx-auto">
      {error && (
        <div className="rounded-lg py-6 px-4 bg-red-300 text-red-800 my-4">
          <p>{error}</p>
          <p>
            <strong>Please try again.</strong>
          </p>
        </div>
      )}
      <div className="text-white">
        {token && !error && <h3 className="">Logging in...</h3>}
      </div>
      {(!token || error) && <StytchLogin config={config} />}
    </div>
  );
}
