import SidebarLayout from "@/components/sidebar/SidebarLayout";
import AppProvider from "@/components/context/AppProvider";
// do not cache this layout
export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white h-full">
        <AppProvider>
          <SidebarLayout>{children}</SidebarLayout>
        </AppProvider>
      </div>
    </>
  );
}
