import "server-only";

import "../globals.css";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import AppProvider from "@/components/context/AppProvider";
// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: "Leadsaprkr",
  description: "Leadsparkr - Connect with your customers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <div className="">
          <AppProvider>
            <SidebarLayout>
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
              </main>
            </SidebarLayout>
          </AppProvider>
        </div>

        <div id="modal-root"></div>
      </body>
    </html>
  );
}
