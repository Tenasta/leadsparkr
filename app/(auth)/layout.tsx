import AppProvider from "@/components/context/AppProvider";
import "../globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="mx-auto max-w-lg">
            <AppProvider>{children}</AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}