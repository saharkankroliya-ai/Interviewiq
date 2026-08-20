"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Header({
  userEmail,
}: {
  userEmail: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const navBtn = (href: string, label: string) => (
    <Link
      href={href}
      style={{
        background: pathname === href ? "#2E4C6D" : "transparent",
        color: pathname === href ? "#fff" : "rgba(27,36,48,0.62)",
        fontSize: 13.5,
        fontWeight: pathname === href ? 600 : 500,
        padding: "9px 14px",
        borderRadius: 20,
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid rgba(27,36,48,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "#1B2430" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              InterviewIQ
            </span>
            <span
              style={{
                fontSize: 11.5,
                color: "rgba(27,36,48,0.62)",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              interview prep for freshers
            </span>
          </div>
        </Link>

        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {userEmail ? (
            <>
              {navBtn("/practice", "Practice questions")}
              {navBtn("/book", "Book a mock interview")}
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(27,36,48,0.5)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  marginLeft: 6,
                }}
              >
                {userEmail}
              </span>
              <button
                onClick={signOut}
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(27,36,48,0.3)",
                  borderRadius: 20,
                  padding: "8px 14px",
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              {navBtn("/login", "Log in")}
              <Link
                href="/signup"
                style={{
                  background: "#F2B807",
                  color: "#1B2430",
                  fontSize: 13.5,
                  fontWeight: 600,
                  padding: "9px 16px",
                  borderRadius: 20,
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
