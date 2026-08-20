"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ROLES, TIMES } from "@/data/questions";

function nextWeekdays(n: number) {
  const days: Date[] = [];
  let d = new Date();
  while (days.length < n) {
    d = new Date(d);
    d.setDate(d.getDate() + 1);
    days.push(new Date(d));
  }
  return days;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

export default function BookPage() {
  const supabase = createClient();
  const days = useMemo(() => nextWeekdays(6), []);

  const [role, setRole] = useState(ROLES[0]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState<{ role: string; date: Date; time: string } | null>(null);

  const canSubmit = !!date && !!time;

  const handleSubmit = async () => {
    if (!date || !time) return;
    setError(null);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in to book a slot.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      role,
      slot_date: date.toISOString().slice(0, 10),
      slot_time: time,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setBooked({ role, date, time });
  };

  if (booked) {
    return (
      <main className="main">
        <div className="form-card" style={{ maxWidth: 480 }}>
          <div
            style={{
              alignSelf: "flex-start",
              background: "#3F7D5C",
              color: "#fff",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: 4,
              marginBottom: 4,
            }}
          >
            BOOKED
          </div>
          <div className="h2">You&apos;re set.</div>
          <p style={{ margin: "2px 0", fontSize: 14.5 }}>Mock interview — {booked.role}</p>
          <p style={{ margin: "2px 0", fontSize: 14.5 }}>
            {fmtDate(booked.date)} · {booked.time}
          </p>

          <div
            style={{
              background: "#EEF3F7",
              borderRadius: 8,
              padding: 16,
              marginTop: 14,
            }}
          >
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
              Before your slot
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: "rgba(27,36,48,0.62)" }}>
              <li>Review at least 2 categories in Practice Questions</li>
              <li>Prepare 2 questions to ask your interviewer</li>
              <li>Have one project or experience ready to walk through in detail</li>
              <li>Test your mic/camera 10 minutes early if it&apos;s a video call</li>
            </ul>
          </div>

          <button
            className="primary-btn-wide"
            style={{ marginTop: 14 }}
            onClick={() => {
              setBooked(null);
              setDate(null);
              setTime("");
            }}
          >
            Book another slot
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <section style={{ maxWidth: 620, marginBottom: 26 }}>
        <div className="eyebrow">PRACTICE FOR REAL</div>
        <h1 className="h1">Book a free mock interview.</h1>
        <p className="intro-text">15 minutes, low pressure, honest feedback.</p>
      </section>

      <div className="form-card" style={{ maxWidth: 560 }}>
        {error && <div className="error-text">{error}</div>}

        <div className="form-group">
          <label className="label">Which role are you interviewing for?</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ROLES.map((r) => (
              
