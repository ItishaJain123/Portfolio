# Itisha Jain — Portfolio

> Personal portfolio website built with React 19, Tailwind CSS, GSAP, and Google Gemini AI.

🔗 **Live:** https://itisha-jain-portfolio.vercel.app/

---

## Features

- **Nova AI Chatbot** — Gemini-powered assistant that answers questions about Itisha's skills, projects, and experience
- **Hire Me Modal** — Recruiters can paste a job description and get an instant AI fit-analysis with match score
- **Animated Typing Effect** — Role titles cycle with a realistic typing/deleting animation in the Hero
- **GSAP Entrance Animations** — Smooth hero section animations on page load
- **Scroll Animations** — IntersectionObserver-based fade/scale animations throughout
- **Email Copy Button** — One-click email copy with toast feedback
- **Resume Download** — Direct PDF download from Hero and Recommendations sections
- **Contact Form** — FormSubmit-powered contact form (no backend needed)
- **Fully Responsive** — Mobile-first design across all screen sizes

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite 7, Tailwind CSS v4 |
| Animations | GSAP 3, CSS IntersectionObserver |
| AI | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| Icons | Lucide React |
| Forms | FormSubmit.co |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx            # Landing section with GSAP + typing effect
│   ├── HireMeModal.jsx     # Hire Me CTA with AI job fit analyzer
│   ├── Chatbot.jsx         # Nova AI chatbot (Gemini-powered)
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Recommendations.jsx
│   ├── Contact.jsx
│   ├── Navigation.jsx
│   └── Footer.jsx
├── data/                   # All content separated from components
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── recommendations.js
│   └── about.js
├── hooks/
│   ├── useScrollAnimation.js   # Consolidated scroll animation hook
│   └── useTypingEffect.js      # Typing effect hook
└── index.css               # Global styles + animation keyframes
```

---

## Run Locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/ItishaJain123/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env

# Start dev server
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root (see `.env.example`):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com/app/apikey).

---

## Deployment

```bash
npm run build   # Output in /dist
```

Deploy the `/dist` folder to Vercel, Netlify, or GitHub Pages.

---

## License

MIT — feel free to use this as inspiration for your own portfolio.

---

*Built with by [Itisha Jain](https://www.linkedin.com/in/itisha-jain/)*
