# Ahmetcan Bağlı — Personal Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.5.27-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> Production-grade personal portfolio of **Ahmetcan Bağlı**, Big Data Analytics student (Associate Degree) at **Manisa Celal Bayar University** and software developer candidate focusing on **C#**, **.NET 10**, **Entity Framework Core 10**, **Microsoft SQL Server**, and **Python Data Science / ML**.

* **Live Website:** [https://ahmetcanbagli.dev](https://ahmetcanbagli.dev)
* **GitHub Profile:** [@Fylgja0](https://github.com/Fylgja0)
* **LinkedIn Profile:** [/in/ahmetcanbagli](https://www.linkedin.com/in/ahmetcanbagli)
* **Contact Email:** `a.can.bagli@gmail.com`

---

## Table of Contents

- [Overview](#overview)
- [Architecture & Highlights](#architecture--highlights)
- [Tech Stack](#tech-stack)
- [Projects Featured](#projects-featured)
- [Quick Start & Local Development](#quick-start--local-development)
- [Deploying to Vercel](#deploying-to-vercel)
- [Project Structure](#project-structure)
- [Security & Performance Audit](#security--performance-audit)
- [License](#license)

---

## Overview

This portfolio is engineered with modern frontend practices to represent a software developer candidate with an authentic academic background in Big Data Analytics. It avoids generic templates in favor of a cohesive, retro-modern terminal design language equipped with real interactive features, four-language localization, and dynamic social media previews.

---

## Architecture & Highlights

1. **Next.js 15 (App Router)**
   - Built on Next.js `15.5.27` using React 19 Server & Client components.
   - Clean separation of concerns with atomic UI components, responsive layout sections, and context providers.

2. **Multilingual Architecture (4 Languages)**
   - Complete support for **English (`en`)**, **Türkçe (`tr`)**, **Deutsch (`de`)**, and **Русский (`ru`)**.
   - Automatic browser language detection on first visit with `localStorage` persistence.
   - Updates `document.documentElement.lang` dynamically for screen readers and search engines.

3. **Interactive Canvas Ambient Engines (Triple Theme)**
   - **01_MTX (Matrix Cyber):** Live falling code streams rendering real C#, Python, SQL, and LINQ syntax tokens.
   - **02_QTM (Futuristic Quantum):** Holographic cyan particle mesh with interactive mouse repulsion and pulse ripples.
   - **03_GTH (Dark Gothic Tech):** Rising crimson embers, cyber-gothic rune particles, and obsidian lighting.
   - Built-in animation toggle (Play/Pause) with automatic respect for `prefers-reduced-motion`.

4. **Client-Side Email Composition & Launchers**
   - Visitors can prepare a pre-filled message directly on the website and open it in **Gmail Web**, **Outlook Web**, or their **Device Mail App** (`mailto:`) with pre-filled sender and contact details.
   - **Quick Launchers:** Enables visitors who prefer writing directly in their mail client to open a pre-addressed draft with one click.
   - **Message Copy:** One-click clipboard copy option with graceful fallback handling.

5. **Accessibility & Keyboard Interactions**
   - Deep dive project modals equipped with keyboard focus trap, `Escape` key listeners, backdrop dismiss, and body scroll lock restoration.
   - Accessibility-focused semantic HTML5 landmark structure (`header`, `main`, `section`, `article`, `footer`).
   - Accessible ARIA menus and dialog attributes (`aria-expanded`, `aria-haspopup`, `aria-modal`, `role="dialog"`).

6. **SEO & Social Share Cards**
   - Native App Router `opengraph-image.tsx` and `twitter-image.tsx` dynamically generating 1200x630 cards matching the terminal brand.
   - Native `icon.tsx` generating retro terminal favicons.
   - Complete Schema.org `Person` JSON-LD structured data.
   - Configured `robots.ts` and `sitemap.ts` with canonical URLs.

---

## Tech Stack

### Core Frontend & Tooling
* **Framework:** Next.js 15.5.27 (App Router)
* **Language:** TypeScript 5.x
* **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
* **Icons:** `lucide-react`
* **Package Manager:** `npm` (standardized with `package-lock.json`)

### Core Development Domains Represented
* **Backend:** C#, .NET 10, Entity Framework Core 10, LINQ, OOP, Code First
* **Databases:** Microsoft SQL Server, Relational Modeling, T-SQL, DbContext Migrations
* **Data Science & ML:** Python, Pandas, Scikit-learn, CatBoost, SMOTE, EDA, NumPy

---

## Projects Featured

### 1. Car Management System
* **Domain:** Backend & Relational Database Engineering
* **Stack:** C#, .NET 10, Entity Framework Core 10, SQL Server, Code First, DbContext, LINQ
* **GitHub Repository:** [Fylgja0/car-management-system](https://github.com/Fylgja0/car-management-system)
* **Highlights:** Combines an object-oriented vehicle class hierarchy with SQL Server Code-First schema migrations, DbContext CRUD operations, and LINQ filtering.

### 2. E-Commerce Return Prediction & Sales Analytics
* **Domain:** Academic Data Science & Machine Learning
* **Stack:** Python, Pandas, Scikit-learn, CatBoost, imbalanced-learn (SMOTE), NumPy
* **GitHub Repository:** [Fylgja0/ecommerce-return-prediction](https://github.com/Fylgja0/ecommerce-return-prediction)
* **Highlights:** Academic machine learning pipeline predicting transaction return outcomes. Includes exploratory data analysis (EDA), SMOTE class balancing, and CatBoost/Scikit-learn classification evaluation (F1-score, Confusion Matrix).

---

## Quick Start & Local Development

### Prerequisites
* **Node.js:** `v18.18.0` or higher (Node.js 20+ LTS recommended)
* **npm:** `v9.x` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Fylgja0/ahmetcanbagli.git
   cd ahmetcanbagli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Lint and typecheck:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Run production server locally:**
   ```bash
   npm run start
   ```

---

## Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial release: Ahmetcan Bağlı Portfolio"
   git branch -M main
   git remote add origin https://github.com/Fylgja0/ahmetcanbagli.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   * Go to [vercel.com](https://vercel.com) and log in.
   * Click **Add New...** > **Project**.
   * Select your GitHub repository.
   * Framework Preset: **Next.js** (automatically detected).
   * Root Directory: `./`.
   * Click **Deploy**.

3. **Custom Domain Setup:**
   * In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
   * Enter your custom domain (e.g., `ahmetcanbagli.dev`).
   * Add the provided `A` or `CNAME` records at your DNS registrar.
   * Vercel will automatically provision SSL certificates and route traffic.

---

## Project Structure

```
├── app/
│   ├── globals.css            # Tailwind CSS & global theme CSS variables
│   ├── icon.tsx               # Dynamic retro terminal 32x32 favicon
│   ├── layout.tsx             # Root layout, metadata, SEO & Schema.org JSON-LD
│   ├── not-found.tsx          # Branded 404 error page
│   ├── opengraph-image.tsx    # Dynamic OpenGraph 1200x630 social preview
│   ├── page.tsx               # Main page aggregating portfolio sections
│   ├── robots.ts              # Search engine crawler instructions
│   ├── sitemap.ts             # XML sitemap configuration
│   └── twitter-image.tsx      # Dynamic Twitter Card 1200x630 preview
├── components/
│   ├── background/
│   │   └── AnimatedBackground.tsx # High-performance Canvas animation (Matrix/Quantum/Gothic)
│   ├── layout/
│   │   ├── Navbar.tsx         # Responsive navbar with theme & language selectors
│   │   └── Footer.tsx         # Identity, copyright, back-to-top & social links
│   ├── sections/
│   │   ├── HeroSection.tsx    # Hero greeting, terminal preview, quick stats
│   │   ├── AboutSection.tsx   # Academic narrative & engineering principles
│   │   ├── SkillsSection.tsx  # Categorized skills with interactive filter
│   │   ├── ProjectsSection.tsx# Projects grid & mobile carousel
│   │   ├── ProjectModal.tsx   # Detailed modal with architecture & roadmaps
│   │   ├── EducationSection.tsx # MCBU Big Data Analytics curriculum & coursework
│   │   ├── CurrentFocusSection.tsx # .NET 10, C#, Python & SQL learning tracks
│   │   └── ContactSection.tsx # Direct Gmail, Outlook, Mail App & copy actions
│   └── ui/
│       ├── SectionHeader.tsx  # Consistent section title & badge styling
│       └── TechBadge.tsx      # Reusable technology tag badges
├── context/
│   └── portfolio-context.tsx  # React Context for theme, language & UI state
├── hooks/
│   └── use-click-outside.ts   # Click outside & keyboard event listeners
├── lib/
│   ├── data.ts                # Single source of truth for projects, skills, education
│   ├── translations.ts        # UI strings across EN, TR, DE, RU
│   └── utils.ts               # Tailwind class merger (clsx + twMerge)
├── types/
│   └── portfolio.ts           # Strict TypeScript interfaces & definitions
├── next.config.ts             # Next.js configuration & HTTP security headers
├── tsconfig.json              # Strict TypeScript compiler options
└── package.json               # NPM scripts & dependencies
```

---

## Security & Performance Audit

* **Strict TypeScript:** No `any` type escapes; complete interface definitions in `types/portfolio.ts`.
* **Safe URL Encoding & Client Handling:** Input values and email parameters are safely encoded with `encodeURIComponent`; security-conscious client-side state handling.
* **Semantic Markup & Focus Management:** Keyboard-friendly interactions with `Escape` key handlers, modal focus traps, and accessible landmarks.
* **Security Headers:** Enforced via `next.config.ts`:
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: SAMEORIGIN`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  * `poweredByHeader: false` (suppresses `X-Powered-By`)
* **Optimized Canvas Rendering:** Framerate limiter (`frameInterval`) and divide-by-zero guards in mouse interaction physics prevent runaway CPU or memory usage.
* **Pure Clean NPM:** Standardized on `package-lock.json`; bun/yarn lockfile conflicts removed.

---

## License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.

---

**Ahmetcan Bağlı** — [GitHub](https://github.com/Fylgja0) · [LinkedIn](https://www.linkedin.com/in/ahmetcanbagli) · [Website](https://ahmetcanbagli.dev)
