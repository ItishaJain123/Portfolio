import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY?.trim(),
);

export const model = genAI.getGenerativeModel({
  model: "gemini-3.8-flash",
});

// Single source of truth for everything the AI features know about Itisha.
// Keep in sync with the resume — last synced July 2026.
export const RESUME_CONTEXT = `
== ABOUT ITISHA JAIN ==
Frontend-focused Full Stack Engineer & GenAI builder, 2+ years of production experience.
Delivers enterprise-grade React applications across ERP and CRM platforms, and Next.js GenAI applications in personal projects.
Sole frontend architect on a multi-module ERP suite; designed the shared component design system adopted as the canonical UI layer organization-wide.
Expertise: React reconciliation, Core Web Vitals (LCP, CLS, INP), unidirectional data flow architecture.

== EXPERIENCE: EAZY ERP (Gurgaon, India) — Software Developer, Mar 2024–Present ==
• Frontend Architecture: Sole frontend architect on Eazy Cockpit — designed component boundary hierarchies grounded in React Fiber's reconciliation model and virtual DOM diffing; eliminated prop drilling via Context API composition and unidirectional data flow across ERP, CRM, and Licensing modules.
• Component Design System: Engineered a React/JavaScript component design system with compound component patterns, custom hook abstractions, and CSS custom property design tokens; integrated Syncfusion for complex data grids and charts, WCAG 2.1 and ARIA compliant — adopted as the authoritative UI layer across multiple product teams.
• Core Web Vitals & Render Performance: Overhauled analytics dashboards targeting LCP, CLS, and INP — React.memo, useTransition, useDeferredValue, React.lazy code splitting, dynamic imports, and windowed list virtualization to eliminate cascade re-renders on high-density enterprise data views.
• CRM & Access Control: Delivered Eazy CRM end-to-end — drag-and-drop lead management pipelines with optimistic UI mutations, Recharts SVG funnel visualizations, React Hook Form + Zod validation; route-scoped RBAC with permission-aware conditional rendering and Express JWT middleware enforcement.
• State Architecture: Enforced client/server state separation — Redux Toolkit normalized slices for global UI state, React Query for server state with stale-while-revalidate caching, optimistic mutations, and background refetching.
• Production Debugging: Resolved stale closure anti-patterns, async race conditions, and React state corruption in ManageDMS via useEffect dependency auditing, AbortController request cancellation, and ref-based escape hatches.
• CI/CD: GitHub Actions pipeline — ESLint/Prettier, Jest + React Testing Library, Vite build optimization with tree shaking and chunk splitting, staged deployments with mandatory quality gates on every PR.
• Recognition: Awarded Top 20 Gold Club Achiever at Eazy ERP — selected company-wide across all departments for outstanding performance.

== TECH STACK ==
Languages: JavaScript ES2024, TypeScript, HTML5, CSS3, C++
Frontend: React.js, Next.js App Router, Redux Toolkit, React Query / TanStack Query, React Hook Form, Zod, Tailwind CSS, ShadcnUI, Radix UI, Syncfusion, GSAP
GenAI/AI: LangChain, RAG pipelines, Gemini API, Pinecone, prompt engineering, multi-agent workflows
Backend & DB: Node.js, Express.js, REST APIs, WebSockets, Clerk Auth, JWT, Redis, PostgreSQL, Prisma ORM, MongoDB, MySQL
DevOps: GitHub Actions CI/CD, Vercel, Git, Jest

== PROJECTS ==
1. MedDocAI — RAG-based clinical document assistant. Next.js App Router streaming chat with React Suspense boundaries and SSE progressive disclosure; React Dropzone ingestion over a LangChain + Gemini RAG pipeline delivering source-cited clinical answers. Multi-agent clinical entity extraction on Prisma/PostgreSQL with Row-Level Security and full audit logging; Clerk auth, Zod validation, ShadcnUI/Radix dark-mode theming.
2. StyleGenie — AI wardrobe organizer. Next.js + Express + Prisma + PostgreSQL (Neon); Gemini AI for clothing detection from pile photos, personalized outfit suggestions, and real-time style critique. 13+ feature pages: AI daily outfits, cost-per-wear analytics (Recharts), outfit calendar, packing lists, Razorpay tiered subscriptions. TanStack Query server state, Zustand persisted auth, JWT httpOnly-cookie auth across cross-origin domains; deployed on Vercel + Render with Cloudinary.
3. Mentai — AI career platform: industry insights, quiz generation, tailored resumes & cover letters. Next.js, ShadcnUI, Clerk, Inngest.
4. Expense Tracker — responsive finance dashboard, real-time income/expense tracking, Firebase, Recharts.

== EDUCATION ==
BTech Computer Science Engineering — Prestige Institute of Engineering Management and Research, Indore (2019–2023). CGPA: 9.10/10, Top 2% of batch.

== OTHER ACHIEVEMENTS ==
• Top 20 Gold Club Achiever at Eazy ERP (company-wide)
• 1 of 20 students selected (from 1800+) to attend G20 Summit 2023
• Secretary General, PMUN — led 10+ committees, 150+ delegates
• Placement Coordinator — 300+ placements, ₹90 lakh budget

== CONTACT ==
Email: jainitisha192@gmail.com | Phone: +91 8619695078
Portfolio: itisha-jain-portfolio.vercel.app | GitHub: github.com/ItishaJain123 | LinkedIn: linkedin.com/in/itisha-jain
Availability: open to full-time roles and exciting freelance projects.
`.trim();
