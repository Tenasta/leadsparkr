"use client";

import { createContext, useContext, useState } from "react";

import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? ""
);

type AppContext = {
  sidebar: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
  };
};

const Context = createContext<AppContext | undefined>(undefined);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        sidebar: { sidebarOpen, setSidebarOpen },
      }}
    >
      <StytchProvider stytch={stytch}>
        <>{children}</>
      </StytchProvider>
    </Context.Provider>
  );
}

export const useSidebarControl = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("The sidebar must be used inside the App context.");
  } else {
    return context.sidebar;
  }
};
