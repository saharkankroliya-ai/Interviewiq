"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/questions";

export default function PracticePage() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("interviewiq-progress");
    if (raw) setProgress(JSON.parse(raw));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem("interviewiq-progress", JSON.stringify(progress));
    }
  }, [progress, loaded]);

  const cat = CATEGORIES.find((c) => c.id === activeCat)!;
  const totalQ = CATEGORIES.reduce((s, c) => s + c.questions.length, 0);
  const reviewedCount = Object.keys(progress).length;
  const pct = totalQ ? Math.round((reviewedCount / totalQ) * 100) : 0;

  const toggleReviewed = (catId: string, idx: number) => {
    const key = `${catId}-${idx}`;
    setProgress((p) => {
      const next = { ...p };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  return (
    <main className="main">
      <section style={{ maxWidth: 620, marginBottom: 20 }}>
        <div className="eyebrow">START HERE</div>
        <h1 className="h1">Questions every fresher gets asked.</h1>
        <p className="intro-text">
          Tap a card to flip it. Mark it reviewed once you can answer it out
          loud, in your own words, without reading.
        </p>
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
        <div style={{ flex: 1, maxWidth: 260, height: 6, background: "rgba(27,36,48,0.12)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#F2B807", borderRadius: 4, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: 11.5, fontFamily: "'IBM Plex Mono', monospace", color: "rgba(27,36,48,0.62)" }}>
          {reviewedCount} of {totalQ} reviewed
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            style={{
              border: `2px solid ${c.color}`,
              borderRadius: 20,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: activeCat === c.id ? c.color : "transparent",
              color: activeCat === c.id ? "#fff" : c.color,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {cat.questions.map((item, idx) => (
          <FlipCard
            key={idx}
            q={item.q}
            a={item.a}
            color={cat.color}
            reviewed={!!progress[`${cat.id}-${idx}`]}
            onToggleReviewed={() => toggleReviewed(cat.id, idx)}
          />
        ))}
      </div>
    </main>
  );
}

function FlipCard({
  q,
  a,
  color,
  reviewed,
  onToggleReviewed,
}: {
  q: string;
  a: string;
  color: string;
  reviewed: boolean;
  onToggleReviewed: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          position: "relative",
          width: "100%",
          height: 190,
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "#fff",
            border: `2px solid ${color}`,
            borderRadius: 8,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: "0.1em", color }}>
            QUESTION
          </span>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.3, margin: 0 }}>
            {q}
          </p>
          <span style={{ fontSize: 11, color: "rgba(27,36,48,0.62)", fontStyle: "italic" }}>
            tap to see how to answer
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: color,
            border: `2px solid ${color}`,
            borderRadius: 8,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)" }}>
            HOW TO ANSWER
          </span>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0 }}>{a}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleReviewed();
        }}
        style={{
          border: `2px solid ${color}`,
          borderRadius: 6,
          padding: "7px 10px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          background: reviewed ? color : "transparent",
          color: reviewed ? "#fff" : color,
        }}
      >
        {reviewed ? "✓ Reviewed" : "Mark reviewed"}
