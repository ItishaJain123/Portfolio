export const projects = [
  {
    id: "meddoc-ai",
    title: "MedDoc-AI",
    description:
      "Full Stack GenAI medical document assistant — Next.js chat UI with streaming responses, RAG pipeline on LangChain & Gemini returning source-cited clinical answers, backed by a 4-agent extraction pipeline on Prisma/PostgreSQL with Clerk auth and full audit logging.",
    technologies: [
      "Next.js",
      "LangChain",
      "Gemini API",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "TailwindCSS",
      "ShadcnUI",
      "Zod",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop&crop=center",
    video: "",
    demoUrl: "https://meddoc-ai.vercel.app/",
    githubUrl: "https://github.com/ItishaJain123/meddoc-ai",
    category: "GenAI / Full Stack",
    year: "2026",
    caseStudy: {
      tagline: "RAG-based clinical document assistant with source-cited answers.",
      problem:
        "Clinicians drown in dense PDFs — lab reports, discharge summaries, guidelines. Generic chatbots hallucinate medical facts, which is unacceptable in a clinical setting where every answer must be traceable to a source.",
      architecture: [
        "Next.js App Router streaming chat UI with React Suspense boundaries and SSE for progressive, token-by-token answer disclosure.",
        "React Dropzone ingestion feeds documents into a LangChain + Gemini retrieval-augmented generation pipeline.",
        "A 4-agent extraction pipeline normalizes clinical entities and writes to Prisma/PostgreSQL with Row-Level Security.",
        "Clerk auth, Zod-validated protected Server Actions, and full audit logging on every query.",
      ],
      decisions: [
        "Chose RAG over fine-tuning so every answer cites its exact source passage — non-negotiable for clinical trust.",
        "SSE streaming instead of a blocking request so long answers feel instant and cancellable.",
        "Row-Level Security at the DB layer rather than app-only checks, so a query can never leak another patient's data.",
      ],
      metrics: [
        { label: "Answer sourcing", value: "100%" },
        { label: "Extraction agents", value: "4" },
        { label: "Auth + audit", value: "Full" },
      ],
    },
  },
  {
    id: "expenseTracker",
    title: "Expense Tracker",
    description:
      "A responsive finance dashboard with real-time tracking of income, expenses, and balances using Firebase and Recharts.",
    technologies: [
      "React.js",
      "Firebase",
      "Tailwind CSS",
      "Recharts",
      "Ant Design",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center",
    video: "/project-videos/portfolio-demo.webm",
    demoUrl: "https://smart-expense-app.vercel.app/",
    githubUrl: "https://github.com/ItishaJain123/Expense-tracker",
    category: "Web Application",
    year: "2026",
    caseStudy: {
      tagline: "Real-time personal finance dashboard with live charts.",
      problem:
        "Most budgeting apps bury the one number people actually care about — where their money went this month — under logins, ads, and clutter. The goal was a fast, glanceable dashboard that updates the moment a transaction lands.",
      architecture: [
        "React SPA with a Firebase Firestore backend for real-time income/expense/balance sync across sessions.",
        "Recharts-powered visualizations (category breakdowns, trend lines) that recompute reactively as data changes.",
        "Ant Design form controls with client-side validation for fast, error-proof transaction entry.",
      ],
      decisions: [
        "Firebase real-time listeners instead of manual refetching, so numbers update live without a reload.",
        "Derived totals computed in-memory rather than stored, keeping the data model simple and always consistent.",
        "Mobile-first responsive layout — people check finances on their phone, not a desktop.",
      ],
      metrics: [
        { label: "Data sync", value: "Real-time" },
        { label: "Chart types", value: "Multiple" },
        { label: "Responsive", value: "100%" },
      ],
    },
  },
  {
    id: "stylegenie",
    title: "StyleGenie",
    description:
      "Full Stack AI wardrobe organizer — Google Gemini detects clothing from pile photos and generates personalized outfits and real-time style critique. 13+ feature pages including AI daily outfits, cost-per-wear analytics, outfit calendar, and Razorpay tiered subscriptions. TanStack Query server state, Zustand persisted auth, JWT httpOnly-cookie auth across cross-origin domains.",
    technologies: [
      "Next.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Gemini AI",
      "TanStack Query",
      "Zustand",
      "ShadcnUI",
      "Razorpay",
    ],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&crop=center",
    video: "",
    demoUrl: "https://stylegenie-alpha.vercel.app/",
    githubUrl: "https://github.com/ItishaJain123/stylegenie",
    category: "GenAI / Full Stack",
    year: "2026",
    caseStudy: {
      tagline: "AI wardrobe organizer that sees your clothes and styles you.",
      problem:
        "People own far more than they wear and forget what's in their own closet. StyleGenie turns a messy pile of clothes into an organized, AI-styled wardrobe with outfit suggestions and cost-per-wear insight.",
      architecture: [
        "Next.js frontend + Express API with Prisma over PostgreSQL (Neon), deployed across Vercel and Render.",
        "Google Gemini vision detects clothing items from pile photos and generates outfit suggestions and real-time style critique.",
        "TanStack Query for server state, Zustand with persist middleware for auth state; Cloudinary for image hosting.",
        "JWT httpOnly-cookie auth working across cross-origin domains; Razorpay for tiered subscriptions.",
      ],
      decisions: [
        "httpOnly-cookie JWT over localStorage tokens to keep auth secure across the split Vercel/Render origins.",
        "Gemini vision instead of a custom CV model — faster to ship and strong zero-shot clothing recognition.",
        "13+ feature pages built on a shared shadcn/ui design system for a consistent, responsive experience.",
      ],
      metrics: [
        { label: "Feature pages", value: "13+" },
        { label: "Subscription tiers", value: "3" },
        { label: "AI-powered", value: "Vision" },
      ],
    },
  },
  {
    id: "mentai",
    title: "Mentai",
    description:
      "AI Career Assistant Platform — Next.js App Router with server components and streaming UI for real-time GenAI-powered resume and cover letter generation. Reduced tailoring time from 45 minutes to under 5 minutes with Clerk auth, Inngest background jobs, and optimistic UI feedback.",
    technologies: ["Next.js", "ShadcnUI", "TailwindCSS", "Clerk", "Inngest", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&crop=center",
    video: "",
    demoUrl: "https://mentai-ai-powered.vercel.app/",
    githubUrl: "https://github.com/ItishaJain123/mentai",
    category: "GenAI / Full Stack",
    year: "2025",
    caseStudy: {
      tagline: "AI career platform that tailors resumes in minutes, not hours.",
      problem:
        "Tailoring a resume and cover letter to each job posting takes ~45 minutes of tedious rewriting — so most people don't do it, and their applications suffer. Mentai automates the tailoring while keeping the candidate's voice.",
      architecture: [
        "Next.js App Router with React Server Components and streaming UI for real-time generation feedback.",
        "GenAI pipeline produces tailored resumes, cover letters, industry insights, and practice quizzes.",
        "Inngest background jobs handle long-running generation without blocking the request.",
        "Clerk authentication and a shadcn/ui + Tailwind design system.",
      ],
      decisions: [
        "Streaming server components so users see output forming instantly instead of staring at a spinner.",
        "Inngest for durable background jobs — generation survives page reloads and retries on failure.",
        "Optimistic UI feedback to keep the flow snappy even while the model is still working.",
      ],
      metrics: [
        { label: "Tailoring time", value: "45m → <5m" },
        { label: "Artifacts", value: "Resume + CL" },
        { label: "Rendering", value: "Streamed" },
      ],
    },
  },
];
