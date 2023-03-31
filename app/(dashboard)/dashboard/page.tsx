"use client";
import { useStytchUser } from "@stytch/nextjs";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isInitialized } = useStytchUser();
  console.log(user);
  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      // window.location.href = "/login";
    }
  }, [user, isInitialized]);
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p>Welcome, {user?.name.first_name}</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4"></div>
      </div>
    </div>
  );
}
