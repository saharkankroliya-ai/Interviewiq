import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "InterviewIQ — interview prep for freshers",
  description:
    "Learn the basic interview questions every fresher gets asked, and book a free mock interview slot.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header userEmail={user?.email ?? null} />
        {children}
        <footer
          style={{
            textAlign: "center",
            padding: "22px 0",
            fontSize: 12,
            color: "rgba(27,36,48,0.62)",
            borderTop: "1px solid rgba(27,36,48,0.12)",
          }}
        >
          InterviewIQ — practice today, walk in ready tomorrow.
        </footer>
      </body>
    </html>
  );
}
