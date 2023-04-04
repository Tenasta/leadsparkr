import AppProvider from "@/components/context/AppProvider";
import "../globals.css";

export const metadata = {
  title: "Leadsparkr - Login",
  description: "Leadsparkr - Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-lg">
      <AppProvider>{children}</AppProvider>
    </div>
  );
}
