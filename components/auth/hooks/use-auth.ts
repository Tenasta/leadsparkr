import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  const stytch = useStytch();
  const { user, isInitialized } = useStytchUser();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [user, isInitialized, router]);

  const signOut = async () => {
    await stytch.session.revoke();
  };

  return {
    user,
    isInitialized,
    signOut,
    redirect: () => {
      router.replace("/login");
    },
  };
};

export default useAuth;
