export type Question = { q: string; a: string };
export type Category = {
  id: string;
  label: string;
  color: string;
  questions: Question[];
};

export const CATEGORIES: Category[] = [
  {
    id: "about",
    label: "About You",
    color: "#2E4C6D",
    questions: [
      {
        q: "Tell me about yourself.",
        a: "Keep it to 3 parts: your background (degree/field), one or two relevant projects or experiences, and why you're excited about this kind of role. Aim for 60–90 seconds, not your whole life story.",
      },
      {
        q: "Why do you want to work here?",
        a: "Show you've done homework: mention something specific about the company (a product, value, or team) and connect it to what you want to learn or contribute — not just 'I need a job.'",
      },
      {
        q: "What are your strengths and weaknesses?",
        a: "Pick a strength that's actually relevant to the role, with a quick example. For weaknesses, name something real and show what you're doing about it — avoid fake weaknesses like 'I work too hard.'",
      },
    ],
  },
  {
    id: "behavioral",
    label: "Behavioral",
    color: "#3F7D5C",
    questions: [
      {
        q: "Tell me about a time you faced a challenge.",
        a: "Use STAR: Situation, Task, Action, Result. Freshers can use college projects, internships, or group assignments — the story matters more than the setting.",
      },
      {
        q: "Describe a time you worked in a team.",
        a: "Focus on your specific contribution, how you handled disagreement if any, and what the outcome was. Interviewers want to see self-awareness, not just 'we worked well together.'",
      },
      {
        q: "How do you handle failure or mistakes?",
        a: "Pick one real (small) example. Show what went wrong, what you learned, and what you'd do differently. Owning mistakes reads as maturity, not weakness.",
      },
    ],
  },
  {
    id: "basics",
    label: "Technical Basics",
    color: "#B5541A",
    questions: [
      {
        q: "What is the difference between a stack and a queue?",
        a: "A stack is LIFO (last in, first out) — like a pile of plates. A queue is FIFO (first in, first out) — like a line at a shop. Know one real use case for each.",
      },
      {
        q: "What is an API, in simple terms?",
        a: "It's a defined way for two pieces of software to talk to each other — like a menu at a restaurant: you order from fixed options, you don't need to know how the kitchen works.",
      },
      {
        q: "What's the difference between a process and a thread?",
        a: "A process is an independent running program with its own memory. A thread is a smaller unit inside a process that shares memory with other threads in that process — lighter weight, faster to switch between.",
      },
    ],
  },
  {
    id: "closing",
    label: "Closing Questions",
    color: "#6B4E9C",
    questions: [
      {
        q: "Do you have any questions for us?",
        a: "Always say yes. Ask about the team you'd join, what success looks like in the first 3 months, or how the role has evolved. Never ask something answered on their website.",
      },
      {
        q: "Where do you see yourself in five years?",
        a: "Show ambition tied to growth, not a rigid title. E.g. 'growing deep technical skills and eventually mentoring others' reads better than a specific job title you can't guarantee.",
      },
    ],
  },
];

export const ROLES = ["Software Engineer", "Data Analyst", "Business/Ops", "Design", "Other"];
export const TIMES = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM", "7:00 PM"];
