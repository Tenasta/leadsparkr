export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
