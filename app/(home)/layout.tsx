import "../globals.css";
import "../home.css";

export const metadata = {
  title: "Leadsaprkr",
  description: "Leadsparkr - Connect with your customers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
