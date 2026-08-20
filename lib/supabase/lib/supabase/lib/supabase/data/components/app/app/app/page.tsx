import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/practice");
  }

  return (
    <main className="main">
      <section style={{ maxWidth: 640, marginBottom: 40 }}>
        <div className="eyebrow">FOR FIRST-TIME JOB SEEKERS</div>
        <h1 className="h1">
          Walk into your first interview
          <br />
          already knowing what to say.
        </h1>
        <p className="intro-text" style={{ marginBottom: 26 }}>
          InterviewIQ teaches you the questions every fresher gets asked —
          and lets you book a free mock interview to practice out loud
          before the real thing.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/signup" className="primary-btn-wide" style={{ width: "auto", textDecoration: "none", display: "inline-block" }}>
            Create a free account
          </Link>
          <Link href="/login" className="ghost-btn" style={{ textDecoration: "none", display: "inline-block" }}>
            I already have an account
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        <FeatureCard
          eyebrow="LEARN"
          title="Question flashcards"
          text="Flip through About You, Behavioral, Technical Basics, and Closing questions — with plain-language answers, not jargon."
        />
        <FeatureCard
          eyebrow="TRACK"
          title="Your progress"
          text="Mark questions reviewed as you go, so you always know what's left before your interview."
        />
        <FeatureCard
          eyebrow="PRACTICE"
          title="A real mock slot"
          text="Book a free 15-minute mock interview and get honest, low-pressure feedback."
        />
      </section>
    </main>
  );
}

function FeatureCard({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(27,36,48,0.12)",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 17,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(27,36,48,0.7)", margin: 0 }}>
        {text}
      </p>
    </div>
  );
}
