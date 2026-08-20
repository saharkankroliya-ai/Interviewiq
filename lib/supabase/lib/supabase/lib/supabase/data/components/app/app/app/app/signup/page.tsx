"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <main className="main">
        <div className="form-card">
          <div className="h2">Check your email</div>
          <p className="intro-text">
            We sent a confirmation link to <strong>{email}</strong>. Click
            it to activate your account, then log in.
          </p>
          <Link href="/login" className="primary-btn-wide" style={{ textAlign: "center", textDecoration: "none" }}>
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div style={{ maxWidth: 420, marginBottom: 24 }}>
        <div className="eyebrow">GET STARTED</div>
        <h1 className="h2">Create your account</h1>
        <p className="intro-text">Free — takes less than a minute.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div className="error-text">{error}</div>}

        <div className="form-group">
          <label className="label">Full name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

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
            placeholder="At least 6 characters"
            required
          />
        </div>

        <button className="primary-btn-wide" type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p style={{ fontSize: 13, color: "rgba(27,36,48,0.62)", margin: 0 }}>
          Already have an account?{" "}
          <Link href="/login" className="muted-link">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
