# Ahmetcan Bağlı — Personal Developer Portfolio & Dynamic Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.27-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169e1?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> Production-grade personal developer portfolio and content management platform of **Ahmetcan Bağlı**, software developer focusing on **C#**, **.NET 10**, **Entity Framework Core 10**, **Microsoft SQL Server**, **PostgreSQL**, and **Python Data Science / ML**.
>
> In addition to showcasing real-world software engineering projects through a retro-modern terminal aesthetic and interactive canvas particle systems, this application includes a full-featured, secure **Admin Management System (`/admin`)** backed by **Neon Serverless PostgreSQL**, **bcrypt** session security, and full dynamic project and message management.

* **Live Website:** [https://ahmetcanbagli-portfolio.vercel.app](https://ahmetcanbagli-portfolio.vercel.app)
* **GitHub Profile:** [@Fylgja0](https://github.com/Fylgja0)
* **LinkedIn Profile:** [/in/ahmetcanbagli](https://www.linkedin.com/in/ahmetcanbagli)
* **Contact Email:** `a.can.bagli@gmail.com`

---

## Table of Contents

- [Overview](#overview)
- [Architecture & Core Highlights](#architecture--core-highlights)
- [Database Architecture & SQL Scripts](#database-architecture--sql-scripts)
- [Admin Management System (`/admin`)](#admin-management-system-admin)
  - [1. Authentication & Session Security](#1-authentication--session-security)
  - [2. Dynamic Projects CRUD (`/admin/projeler`)](#2-dynamic-projects-crud-adminprojeler)
  - [3. Awards & Achievements Showcase (`/admin/oduller` & `/oduller`)](#3-awards--achievements-showcase-adminoduller--oduller)
  - [4. Messages & Privacy Compliance (`/admin/mesajlar`)](#4-messages--privacy-compliance-adminmesajlar)
  - [5. Active Session Tracking & Remote Revocation (`/admin/oturumlar`)](#5-active-session-tracking--remote-revocation-adminoturumlar)
- [Tech Stack](#tech-stack)
- [Projects Featured](#projects-featured)
- [Project Structure](#project-structure)
- [Quick Start & Local Development](#quick-start--local-development)
- [Deployment & Environment Variables](#deployment--environment-variables)
- [Security & Performance Audit](#security--performance-audit)
- [License](#license)

---

## Overview

This application bridges the gap between a sleek front-facing developer showcase and a real-world, production-ready backend administration tool. 

It rejects static web templates in favor of a bespoke retro-modern cyber-terminal interface, driven by high-performance HTML5 Canvas physics simulations and 4-language internationalization. Behind an authenticated admin layer, it provides dynamic CRUD operations over a cloud PostgreSQL database, allowing real-time publishing, project sorting, telemetry tracking, and privacy compliance without requiring manual redeployments.

---

## Architecture & Core Highlights

1. **Next.js 15 (App Router) & React 19**
   - Built on Next.js `15.5.27` utilizing React 19 Server and Client Components.
   - Form operations, project mutations, and message handling execute securely via type-safe Next.js **Server Actions**.

2. **Serverless PostgreSQL Database (`@neondatabase/serverless`)**
   - Direct connection pooling with SSL encryption.
   - Resilient database lifecycle: includes automatic table creation/migrations on first connection, as well as an in-memory graceful fallback mode if no database URL is supplied.

3. **Multilingual Architecture (4 Languages)**
   - Complete localized UI across **English (`en`)**, **Türkçe (`tr`)**, **Deutsch (`de`)**, and **Русский (`ru`)**.
   - Automatic browser language detection with `localStorage` persistence and dynamic `document.documentElement.lang` synchronisation for screen readers and search engines.

4. **Interactive Ambient Canvas Engines (Triple Theme)**
   - **01_MTX (Matrix Cyber):** Live falling green code streams rendering authentic C#, Python, SQL, and LINQ syntax tokens.
   - **02_QTM (Futuristic Quantum):** Holographic cyan particle mesh with interactive mouse repulsion physics and pulse waves.
   - **03_GTH (Dark Gothic Tech):** Rising crimson embers, cyber-gothic rune particles, and obsidian lighting.
   - **Freeze Frame Animation:** Pausing an animation freezes the canvas particles in place rather than blanking the screen, paired with consistent play/pause state icons.

5. **Client-Side Email Composition & Instant Launchers**
   - Direct database submission with GDPR/KVKK consent confirmation.
   - Quick launchers enabling visitors to open pre-filled drafts directly inside **Gmail Web**, **Outlook Web**, or their **Native Mail App** (`mailto:`), plus a one-click clipboard copy fallback.

6. **SEO, Meta & Social Previews**
   - Dynamic 1200x630 OpenGraph and Twitter card generation via App Router `opengraph-image.tsx` and `twitter-image.tsx`.
   - Dynamic terminal icon via `icon.tsx`, valid Schema.org `Person` JSON-LD structured data, and auto-generated `robots.ts` and `sitemap.ts`.

---

## Database Architecture & SQL Scripts

The project manages relational persistence with PostgreSQL. Database definitions, seeds, and analytical queries are organized under the [`sql/`](sql/) directory:

### 1. `sql/projeler.sql` — Projects Schema & Management CRUD
* **DDL Definition:** Defines the `projeler` table (`id`, `slug`, `baslik`, `kategori`, `github_url`, `canli_url`, `teknolojiler`, `aciklama`, `detay`, `one_cikan`, `sira`, `yayinda`, `ek_bilgiler`, `olusturma`).
* **Initial Seed Data:** Seed records for the 3 flagship projects (*Car Management System*, *E-Commerce Return Prediction*, *Turkey's Electricity Transformation*).
* **Admin Queries:** Comprehensive CRUD queries for inserting new projects with auto-generated slugs, updating project metadata, toggling published (`yayinda`) and featured (`one_cikan`) statuses, reordering, and deleting.

### 2. `sql/sorgular.sql` — Relational & Security Queries
* **Relational Filtering:** Queries filtering awards by rank, recency, category relationships (`LEFT JOIN` + `GROUP BY`), and aggregate calculations (`AVG`, `COUNT(*) FILTER`).
* **Security Maintenance:** Automated cleanup query deleting expired or 30-minute inactive sessions:
  ```sql
  DELETE FROM oturumlar
  WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes';
  ```
* **Privacy & Data Anonymization:** Atomic data redaction using `WITH ... RETURNING` to anonymize personal data older than 1 year and record the audit count into an archive log in a single transaction:
  ```sql
  WITH anonimlestirilenler AS (
    UPDATE iletisim_mesajlari
    SET ad_soyad = 'Anonim',
        eposta = 'anonim@example.invalid',
        mesaj = '[anonimleştirildi]'
    WHERE gonderim_zamani < now() - interval '1 year'
    RETURNING id
  )
  INSERT INTO imha_kayitlari (adet, zaman)
  SELECT COUNT(*), now() FROM anonimlestirilenler;
  ```

---

## Admin Management System (`/admin`)

The protected administration panel provides complete governance over the platform:

### 1. Authentication & Session Security
* **Gatekeeper (`/giris`):** Authenticates administrators using passwords salted and verified via `bcryptjs` (`ADMIN_HASH`).
* **Secure Cookie Jar:** Session tokens are stored in `HTTPOnly`, `SameSite=Lax`, `Secure` cookies, mitigating cross-site scripting (XSS) extraction.
* **Inactivity Timeout:** Sessions automatically invalidate after **30 minutes** of inactivity.
* **Persistent Session Ledger:** Sessions are tracked in the database with client IP, user-agent, token hash, and last active timestamp.

### 2. Dynamic Projects CRUD (`/admin/projeler`)
* Manage the portfolio's project catalogue in real time:
  * **Create:** Auto-generates URL-safe slugs from titles, accepts tech stacks, summaries, deep dive descriptions, and repository/live URLs.
  * **Read & Filter:** View all projects with status badges (Published, Hidden, Featured, Sort Order).
  * **Update:** In-place modification of any project field.
  * **Toggles:** Instant toggle for live publication and front-page spotlight.
  * **Delete:** Modal-guarded deletion.
* The public `/projects` page and the home page featured showcase fetch dynamically from this database.

### 3. Awards & Achievements Showcase (`/admin/oduller` & `/oduller`)
* Manage technical recognitions, degrees, and milestones.
* Complete CRUD interface for administrators and a filtered, categorized view for public visitors at `/oduller`.

### 4. Messages & Privacy Compliance (`/admin/mesajlar`)
* Inbox for inquiries submitted through the contact form, alongside explicit GDPR/KVKK consent verification.
* Status tracking (read/unread toggling) and safe deletion.
* **One-Click Data Anonymization:** Executes the atomic SQL anonymization workflow to redact personal data older than 1 year while preserving aggregate metrics.

### 5. Active Session Tracking & Remote Revocation (`/admin/oturumlar`)
* Inspect all currently active sessions across devices.
* Visual indicator highlighting the current device session.
* **Remote Session Revocation:** Terminate sessions on other devices with one click.
* Bulk sweep tool for clearing expired and inactive tokens.

---

## Tech Stack

### Core Framework & Backend
* **Framework:** Next.js 15.5.27 (App Router, Server Actions)
* **Language:** TypeScript 5.x (Strict Type Checking)
* **Database:** PostgreSQL (Neon Serverless)
* **Database Driver:** `@neondatabase/serverless`
* **Authentication & Cryptography:** `bcryptjs`
* **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
* **Icons:** `lucide-react`
* **Package Manager:** `npm` (standardized with `package-lock.json`)

### Core Engineering Domains Represented
* **Backend:** C#, .NET 10, Entity Framework Core 10, LINQ, OOP, Code First
* **Databases:** Microsoft SQL Server, PostgreSQL, Relational Modeling, T-SQL, DDL/DML, Schema Migrations
* **Data Science & ML:** Python, Pandas, Scikit-learn, CatBoost, SMOTE, EDA, NumPy, Data Storytelling, SVG Visualizations

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

### 3. Türkiye'nin Elektrik Dönüşümü (Turkey's Electricity Transformation)
* **Domain:** Interactive Data Storytelling & Energy Analytics
* **Stack:** Python, Pandas, NumPy, Matplotlib, Jupyter Notebook, Vanilla JavaScript, HTML5, CSS3, SVG, Ember Data, Vercel
* **Live Demo:** [turkiye-elektrik-donusumu.vercel.app](https://turkiye-elektrik-donusumu.vercel.app/)
* **GitHub Repository:** [Fylgja0/turkiye-elektrik-donusumu](https://github.com/Fylgja0/turkiye-elektrik-donusumu)
* **Highlights:** Scrollytelling data story exploring 25 years (2000–2024) of electricity generation data from Ember. Features dynamic SVG chart transitions, zero external charting libraries, and an interactive "explore yourself" filter panel.

---

## Project Structure

```
├── app/
│   ├── actions/               # Server Actions (projects CRUD & contact handler)
│   │   ├── contact.ts         # Contact submission with consent verification
│   │   └── projects.ts        # Admin project mutations (create, update, delete, toggle)
│   ├── admin/                 # Protected administration portal
│   │   ├── layout.tsx         # Admin wrapper, auth gatekeeper & navigation
│   │   ├── page.tsx           # Dashboard metrics & system telemetry overview
│   │   ├── mesajlar/page.tsx  # Inquiries inbox & privacy anonymization tool
│   │   ├── oduller/page.tsx   # Awards & credentials management
│   │   ├── oturumlar/page.tsx # Active session monitor & remote session termination
│   │   └── projeler/page.tsx  # Dynamic project management workspace
│   ├── giris/page.tsx         # Secure admin authentication interface
│   ├── oduller/page.tsx       # Public awards & credentials showcase
│   ├── projects/page.tsx      # Dynamic project portfolio page
│   ├── globals.css            # Tailwind CSS & global theme design tokens
│   ├── icon.tsx               # Dynamic retro terminal 32x32 favicon
│   ├── layout.tsx             # Root layout, metadata, SEO & Schema.org JSON-LD
│   ├── not-found.tsx          # Branded terminal 404 handler
│   ├── opengraph-image.tsx    # Dynamic OpenGraph 1200x630 social preview
│   ├── page.tsx               # Single-page terminal experience & featured projects
│   ├── robots.ts              # Search crawler directives
│   ├── sitemap.ts             # Auto-generated XML sitemap
│   └── twitter-image.tsx      # Dynamic Twitter Card 1200x630 social preview
├── components/
│   ├── admin/                 # Admin navigation buttons and action controls
│   ├── background/            # Ambient Canvas engines (Matrix, Quantum, Gothic)
│   ├── layout/                # Navbar, Footer, and responsive wrappers
│   ├── sections/              # Modular sections (Hero, About, Projects, Skills, etc.)
│   └── ui/                    # Atomic UI components (SectionHeader, TechBadge, etc.)
├── context/
│   └── portfolio-context.tsx  # Theme, language, and interaction state management
├── lib/
│   ├── auth.ts                # Bcrypt verification, session persistence & cookie utils
│   ├── db.ts                  # Neon PostgreSQL pool with auto-migration & fallbacks
│   ├── projects.ts            # Project data access layer & database seeds
│   ├── data.ts                # Curriculum, skills, and base data structures
│   ├── translations.ts        # Quad-language dictionary (EN, TR, DE, RU)
│   └── utils.ts               # Tailwind class merger (clsx + twMerge)
├── sql/
│   ├── projeler.sql           # Projeler table DDL, seed data & CRUD operations
│   └── sorgular.sql           # Relational queries, session cleanup & data anonymization
├── types/
│   └── portfolio.ts           # Strict TypeScript interfaces & database record types
├── next.config.ts             # Next.js configuration & HTTP security headers
├── tsconfig.json              # Strict TypeScript configuration
└── package.json               # NPM scripts & dependencies
```

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

## Deployment & Environment Variables

This application is optimized for zero-configuration, continuous deployment on [Vercel](https://vercel.com).

### Environment Variables

To connect a live database and configure administrative access, set the following environment variables in your deployment dashboard:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon Serverless PostgreSQL connection string (SSL required) | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `ADMIN_PASSWORD` | Plaintext administrator login password (default fallback: `admin123`) | `your_secure_password` |
| `ADMIN_HASH` | Optional pre-computed bcrypt hash of your admin password | `$2a$10$...` |
| `SESSION_SECRET` | Secret key used for signing session identifiers | `your_cryptographic_secret_key` |

> **Graceful Fallback Mode:** If `DATABASE_URL` is omitted (e.g., during static analysis or in isolated preview environments), the platform automatically operates in an in-memory fallback state with zero crashes or build failures.

---

## Security & Performance Audit

* **Strict TypeScript:** 100% strict type safety with no `any` escapes.
* **Safe Input Sanitization:** Form arguments and URL parameters are protected against injection and safely encoded via `encodeURIComponent`.
* **Cryptographic Standards:** Bcrypt password hashing with high work factors and timing-attack resistant comparisons.
* **Hardened HTTP Headers:** Enforced via `next.config.ts`:
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: SAMEORIGIN`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  * `poweredByHeader: false` (suppresses `X-Powered-By`)
* **Optimized Canvas Rendering:** Frame interval throttling (`frameInterval`) and physics edge-case guards prevent CPU runaway. Animations automatically suspend when the browser tab is hidden.
* **Clean Package Footprint:** Pure `package-lock.json` dependency tree without package manager collision.

---

## License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.

---

**Ahmetcan Bağlı** — [GitHub](https://github.com/Fylgja0) · [LinkedIn](https://www.linkedin.com/in/ahmetcanbagli)
