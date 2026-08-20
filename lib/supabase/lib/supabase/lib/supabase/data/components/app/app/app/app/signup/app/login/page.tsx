"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/practice";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <main className="main">
      <div style={{ maxWidth: 420, marginBottom: 24 }}>
        <div className="eyebrow">WELCOME BACK</div>
        <h1 className="h2">Log in</h1>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div className="error-text">{error}</div>}

        <div className="form-group">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </div>

        <button className="primary-btn-wide" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>

        <p style={{ fontSize: 13, color: "rgba(27,36,48,0.62)", margin: 0 }}>
          No account yet?{" "}
          <Link href="/signup" className="muted-link">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
