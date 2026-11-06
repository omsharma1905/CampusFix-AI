# CampusFix AI

> **Intelligent Campus Physical Infrastructure & Facilities Operations Platform**

CampusFix AI is an institutional facilities management and campus operations platform engineered to unify physical asset registries, reactive incident triaging, statutory preventive maintenance compliance, and spatial telemetry into an integrated, human-centered operations console for universities and large educational estates.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45.4-C5EA32?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.9.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Frontend_Prototype_v0.1.0-orange?style=flat-square)](#current-implementation-status)

---

## Table of Contents

- [Project Overview](#project-overview)
- [The Problem](#the-problem)
- [The Solution & Architectural Approach](#the-solution--architectural-approach)
- [Key Features](#key-features)
- [Visual Preview](#visual-preview)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone & Installation](#clone--installation)
  - [Environment Variables](#environment-variables)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Core User Workflows](#core-user-workflows)
- [Design System & UI Ergonomics](#design-system--ui-ergonomics)
- [Security & Data Lifecycle Guardrails](#security--data-lifecycle-guardrails)
- [Quality Assurance & Validation](#quality-assurance--validation)
- [Current Implementation Status](#current-implementation-status)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

Higher education campuses represent complex physical environments where thousands of high-value assets—from central chiller compressors and high-voltage substations to lecture hall laser projectors and cleanroom fume extractors—are distributed across dozens of buildings and zones.

Historically, facilities operations have relied on fragmented desktop spreadsheets, disconnected vendor maintenance portals, paper inspection check-sheets, and unstructured incident emails. **CampusFix AI** addresses this fragmentation by introducing an institutional operating workspace designed specifically for facility directors, dispatch coordinators, campus engineers, and field technicians.

The platform combines multi-step asset onboarding, real-time ticket queues, SLA countdowns, statutory preventive schedule compliance, and interactive diagnostic simulators into a cohesive application shell.

```
       ┌────────────────────────────────────────────────────────┐
       │                   CAMPUSFIX AI PLATFORM                │
       └───────────────────────────┬────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Asset Registry  │     │ Incident Triage  │     │ Statutory PM &   │
│  & Dynamic Tags  │     │ & SLA Monitoring │     │ Compliance Cal.  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## The Problem

Campus facilities departments encounter chronic operational bottlenecks that impact safety, student learning, and long-term capital replacement costs:

1. **Fragmented Asset Records:** Physical equipment records are isolated across departmental silos without unified identification, serial number indexes, or custodianship mapping.
2. **Delayed Reactive Triaging:** Faults reported through unstructured channels (email, phone, paper) lack severity classification, delaying responses to critical HVAC, electrical, or life-safety failures.
3. **Statutory Compliance Blindspots:** Quarterly and annual regulatory inspections (ASHRAE 15, IEEE C57, NFPA 110, EPA water purity) are managed manually, risking audit failures.
4. **Disjointed Commissioning:** When new equipment arrives, technicians lack a structured onboarding protocol to capture basic identity, environmental parameters, spatial hierarchies, and maintenance contracts in a single pass.
5. **Lack of Operational Visibility:** Leadership lacks a single view showing zone-by-zone health scores, open tickets, technician workload, and imminent SLA breaches.

---

## The Solution & Architectural Approach

CampusFix AI models the campus environment as a connected physical-digital network:

- **Structured Asset Ledger:** Every physical asset is indexed with technical specifications, serial numbers, custodianship, depreciation stages, and dynamic QR transponder payloads.
- **6-Step Commissioning Wizard:** A structured multi-tenant wizard guides registrars through Basic Identity, Classification & Criticality, Spatial Topology (Campus $\rightarrow$ Building $\rightarrow$ Floor $\rightarrow$ Space), Lifecycle Milestones, and Maintenance Schedules.
- **Proactive SLA Monitor:** Incoming tickets are color-coded by urgency (Critical, High, Medium, Low) with automated countdown timers, assigned technician cards, and zone filters.
- **Statutory Milestones Calendar:** Upcoming preventive maintenance tasks highlight compliance specs (NFPA, IEEE, ASHRAE) and distinguish external vendor contracts from internal crew duties.
- **Vertical Capsule Navigation Rail:** An ergonomic, space-efficient floating capsule rail allows technicians and directors to traverse operational modules with deterministic hash routing and zero workspace clipping.

---

## Key Features

### 1. Operations Command Dashboard (`/dashboard`)
- **Five Primary KPI Metrics:** Total Registered Assets, Open Maintenance Issues, Active Work Orders, PM Compliance %, and Campus Health Index.
- **Active Zone & Campus Filter:** Global filtering by campus campus nodes (Apex Main, Health Sciences, Innovation Park) and zones (North Science Quad, Engineering Complex, etc.).
- **Real-Time Ticket Queue:** Searchable table with priority badges, live SLA countdown clocks, technician avatars, and in-modal ticket inspection drawers.
- **Asset Health Overview:** Distribution breakdowns across Healthy, Attention Needed, Critical Risk, and Overhaul states.
- **Building Incident Density:** Visual progress meters showing issue density and fault shares across core facilities and departments.
- **Operational Activity Audit Feed:** Audit trail tracking dispatches, SLA escalations, completed maintenance tasks, and asset onboarding events.

### 2. Multi-Tenant Asset Registry (`/assets`)
- **Multi-View Catalog:** Toggle between high-density operational table view and visual card grid.
- **Multi-Dimensional Filtering:** Filter simultaneously by Building Block, Operational Condition (Healthy, Critical, Maintenance Required, Retired), and Health Score bracket.
- **Batch Operations:** Multi-select assets for bulk technician dispatch, QR tag print queue generation, or real-time CSV ledger export.
- **CSV Data Ingestion Modal:** Client-side CSV import interface supporting schema mapping and record parsing.
- **Dynamic Tag Modal:** High-resolution vector QR tag preview modal with direct browser print formatting.

### 3. Asset Registration Wizard (`/assets/new`)
- **Step 01 — Basic Info:** Asset common name, OEM manufacturer, model number, serial number, pre-assigned draft tag, and RFID field.
- **Step 02 — Classification:** Primary category, sub-category, operational criticality tier (Tier 1–3), and accounting asset class.
- **Step 03 — Location & Stewardship:** Topology selector (Campus $\rightarrow$ Building $\rightarrow$ Floor $\rightarrow$ Room), owning department, and custodian assignment.
- **Step 04 — Lifecycle & Accounting:** Acquisition date, commissioning date, useful life expectancy, purchase price, warranty expiry, and salvage value.
- **Step 05 — Maintenance Strategy:** Strategy selection (Run-to-Fail, Periodic PM, Predictive IoT), inspection intervals, team assignments, and compliance protocol selection.
- **Step 06 — Verification & Commit:** Full record summary with provisional tag generation, PDF/SVG export, and custody confirmation gates.
- **Autosave Draft Engine:** Local draft caching with a 7-day retention TTL and manual discard controls.

### 4. Registration Confirmation Receipt (`/assets/registration-success`)
- **Digital Registration Slip:** Summary receipt displaying permanent Asset ID, converted draft reference, timestamp, and simulated ledger transaction hash.
- **Dynamic QR Tag Label:** Embedded vector QR code linked to the asset record URL, with single-click SVG download and direct print formatting.
- **Action Toolbar:** Direct navigation to open the created asset record or register another asset.

### 5. Detailed Asset Operational View (`/assets/[assetId]`)
- **Header Telemetry:** Real-time asset badge, health score rating, operational status, and custodian contact information.
- **Dynamic QR Transponder:** Interactive vector QR code generator with cryptographic hash payload and last-scanned metadata.
- **Multi-Year Lifecycle Progress:** 6-stage lifecycle progression bar (Procurement $\rightarrow$ Registration $\rightarrow$ Commissioning $\rightarrow$ Operational Use $\rightarrow$ Mid-Life Overhaul $\rightarrow$ Retirement).
- **Maintenance History Log:** Chronological record of completed work orders, technician signoffs, and lumens/thermals inspection notes.
- **Documentation Vault:** PDF document index for OEM manuals, procurement POs, warranty certs, and lux/air balancing acceptance signoffs.

### 6. Institutional Authentication Suite (`/signin`, `/signup`, `/verify-email`, `/forgot-password`, `/reset-password`)
- **Editorial Dual-Panel Composition:** Balanced desktop layout featuring the Campus Digital Twin architectural visual alongside the authentication forms.
- **Interactive Prototype State Switchers:** Docked testing consoles on `/signin`, `/signup`, and `/verify-email` that simulate Empty, Filled, Validation Error, 401 Rejection, and Loading states without backend dependencies.
- **7-Stage Lifecycle Test Bench (`/verify-email`):** Diagnostic console allowing developers to step through Pending, Checking, Resending, Rate-Limit Cooldown, Verified Pass, Expired Token, and Gateway Error simulation phases.
- **Enclave Theme Toggle:** Seamless switching between Dark Enclave (`#030407`) and Light (`#FFFFFF`/`#F7F8EF`) modes with immediate context persistence.

---

## Visual Preview

The user interface uses an institutional design system constructed with warm workspace surfaces, deep midnight containers, and high-visibility citron accents.

```
┌────────────────────────────────────────────────────────────────────────┐
│  CF  │  APEX UNIVERSITY · CENTRAL FACILITIES               v2.4.0-PROD │
├──────┼─────────────────────────────────────────────────────────────────┤
│ (○)  │  Welcome back, Facilities Operations                            │
│  ::  │  Campus physical infrastructure is operating within tolerance   │
│  []  ├─────────────────────────────────────────────────────────────────┤
│  /\  │ [ 4,826 Assets ] [ 34 Open Issues ] [ 19 Work Orders ] [ 94.2% ]│
│  {}  ├─────────────────────────────────────────────────────────────────┤
│  ~~  │  LIVE TICKET QUEUE & SLA MONITOR                                │
│      │  • Centrifugal Chiller Unit #02  | CRITICAL | Marcus Vance | 38m│
│      │  • Passenger Lift #03 East Bank  | CRITICAL | Derrick Chen | 1h │
│      │  • Cleanroom Fume Hood #07       | CRITICAL | Elena Rostova| 1h │
└──────┴─────────────────────────────────────────────────────────────────┘
```

*Campus digital twin visual asset located in repository:*  
[`public/images/hero-campus-isometric.jpg`](public/images/hero-campus-isometric.jpg)

---

## Technology Stack

### Implemented Frontend & Architecture

| Technology | Exact Version | Purpose & Responsibility |
| :--- | :--- | :--- |
| **Next.js** | `16.4.5` | React framework, App Router routing, dynamic routes, and static page generation |
| **React** | `19.2.0` | Declarative component architecture and client-side lifecycle management |
| **React DOM** | `19.2.0` | Browser DOM rendering engine |
| **TypeScript** | `5.9.3` | Strict static typing across components, models, and mock registries |
| **Tailwind CSS** | `4.3.3` | Utility-first CSS framework with custom `@theme` design tokens |
| **@tailwindcss/postcss**| `4.3.3` | PostCSS processing for Tailwind CSS v4 pipeline |
| **Lucide React** | `0.468.0` | Cohesive iconography across operational modules, statuses, and navigation |
| **Zod** | `4.1.12` | Environment variable validation schema (`src/lib/env.ts`) |

### Configured Database & Migration Layer (Scaffolding)

| Technology | Exact Version | Status & Role |
| :--- | :--- | :--- |
| **Drizzle ORM** | `0.45.4` | Configured TypeScript ORM (`src/db/client.ts`), awaiting schema rollout |
| **Postgres.js** | `3.4.7` | High-performance PostgreSQL driver configured for server-side persistence |
| **Drizzle Kit** | `0.31.8` | CLI migration generator and database schema management utility |
| **tsx** | `4.20.6` | TypeScript executor powering migration runs (`npm run db:migrate`) |

*Note on Database Implementation:* The database client and Drizzle configurations are preserved as scaffolding. In accordance with current project milestones, all active application views run on typed, client-side prototype models.

---

## Architecture Overview

```mermaid
flowchart TD
    subgraph Client ["Client Browser Runtime"]
        Route["App Router Route Navigation"]
        Theme["Theme Contexts (Landing & Auth)"]
        Storage["LocalStorage (Drafts & Receipts with TTL)"]
    end

    subgraph AppRouter ["Next.js 16 App Router (/src/app)"]
        RootLayout["Root Layout (Geist + Newsreader)"]
        LandingPage["/ (Landing Page)"]
        DashboardPage["/dashboard (Operations Shell)"]
        AssetPages["/assets & /assets/[assetId] & /assets/new"]
        AuthPages["/signin & /signup & /verify-email"]
    end

    subgraph ComponentLayer ["Modular Components (/src/components)"]
        DashboardShell["DashboardShell (Capsule Rail, Header, Grids)"]
        AssetShell["AssetRegistryShell & RegisterWizardShell"]
        AuthViews["AuthView, SignUpView, VerifyEmailView"]
        Simulators["Docked Prototype State Switchers & Stage Harness"]
    end

    subgraph DataLayer ["Data Registries (/src/components/*/mock-data.ts)"]
        AssetMock["Asset Ledgers & Specs (INITIAL_ASSET_RECORDS)"]
        DashboardMock["Live Tickets, KPIs & PM Schedules"]
    end

    subgraph FutureBackend ["Database Scaffolding (/src/db)"]
        DrizzleClient["Drizzle Client (src/db/client.ts)"]
        PostgresDB[("PostgreSQL Database (Planned)")]
    end

    Client --> AppRouter
    AppRouter --> ComponentLayer
    ComponentLayer --> DataLayer
    ComponentLayer --> Storage
    DrizzleClient -.->|Planned Phase| PostgresDB
```

### Architectural Principles
1. **Deterministic Navigation Precedence:** The vertical capsule rail listens to initial window loads, Next.js client transitions, `hashchange`, and `popstate` events, mapping routes to active nav items without state desynchronization.
2. **Defensive Storage Boundaries:** `localStorage` persistence enforces TTL eviction (24 hours for completed registration slips, 7 days for abandoned drafts).
3. **Responsive Containment:** All content containers declare `min-w-0 max-w-full overflow-hidden`, preventing wide tabular datasets from causing horizontal viewport clipping on mobile and tablet devices.

---

## Project Structure

```
campusfix-ai/
├── public/
│   └── images/
│       └── hero-campus-isometric.jpg   # Photorealistic campus isometric digital twin
├── src/
│   ├── app/                            # Next.js 16 App Router pages and route layouts
│   │   ├── assets/
│   │   │   ├── [assetId]/              # Dynamic asset detail page (/assets/[assetId])
│   │   │   ├── new/                    # 6-Step Asset Registration Wizard (/assets/new)
│   │   │   ├── registration-success/   # Registration confirmation slip & tag dispatch
│   │   │   ├── error.tsx               # Asset module error boundary
│   │   │   ├── loading.tsx             # Asset module skeleton loader
│   │   │   └── page.tsx                # Asset Management registry view (/assets)
│   │   ├── dashboard/
│   │   │   ├── error.tsx               # Dashboard error boundary
│   │   │   ├── loading.tsx             # Dashboard skeleton loader
│   │   │   └── page.tsx                # Institutional operations dashboard (/dashboard)
│   │   ├── forgot-password/            # Password recovery flow (/forgot-password)
│   │   ├── reset-password/             # Password reset flow (/reset-password)
│   │   ├── signin/                     # Sign In portal (/signin)
│   │   ├── signup/                     # Sign Up & onboarding (/signup)
│   │   ├── verify-email/               # Email handshake & QA console (/verify-email)
│   │   ├── globals.css                 # Custom @theme CSS design tokens & fonts
│   │   ├── layout.tsx                  # Root HTML shell & metadata
│   │   └── page.tsx                    # Public landing page (/)
│   ├── components/                     # Modular presentation components
│   │   ├── assets/                     # Asset table, grid, KPI, and detail subcomponents
│   │   │   ├── details/                # Header, QR, health, lifecycle, and specs components
│   │   │   ├── register/               # Steps 01–06 wizard forms and preview modal
│   │   │   ├── registration-success/   # Receipt slip and tag print components
│   │   │   ├── mock-data.ts            # Detailed asset ledger records & filter options
│   │   │   └── types.ts                # TypeScript interfaces for asset records
│   │   ├── auth/                       # Authentication views, forms, and prototype switchers
│   │   │   ├── auth-theme-context.tsx  # Auth theme toggle context (Enclave Dark/Light)
│   │   │   ├── signin-form.tsx         # Sign In form with docked Stitch prototype switcher
│   │   │   ├── signup-form.tsx         # Sign Up form with integrated institution code card
│   │   │   └── verify-email-form.tsx   # Verify email form with 7-stage QA test bench
│   │   ├── dashboard/                  # Dashboard shell and operational modules
│   │   │   ├── dashboard-header.tsx    # Header with campus selector, search, actions
│   │   │   ├── dashboard-sidebar.tsx   # Vertical Capsule Rail navigation component
│   │   │   ├── dashboard-kpi-grid.tsx  # Responsive 5-card metric row
│   │   │   ├── live-ticket-queue.tsx   # Real-time incident table with SLA clocks
│   │   │   ├── mock-data.ts            # Mock tickets, PM schedule, activity feed
│   │   │   └── types.ts                # TypeScript definitions for operational models
│   │   └── landing/                    # Public landing page sections & theme context
│   ├── db/                             # Configured Drizzle & PostgreSQL data layer
│   │   ├── schema/
│   │   │   └── index.ts                # Drizzle schema entry point (scaffolding)
│   │   ├── client.ts                   # Drizzle client constructor
│   │   └── migrate.ts                  # Database migration execution script
│   └── lib/
│       └── env.ts                      # Zod schema validation for environment variables
├── .env.example                        # Template environment variables
├── drizzle.config.ts                   # Drizzle Kit migration configuration
├── eslint.config.mjs                   # ESLint flat configuration (Core Web Vitals & TS)
├── next.config.ts                      # Next.js server configuration & remote images
├── package.json                        # Project metadata, scripts, and dependencies
├── postcss.config.mjs                  # PostCSS plugins configuration
└── tsconfig.json                       # Strict TypeScript compiler options
```

---

## Application Routes

| Route | Page Component | Purpose | Current Implementation Status |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPageView` | Public introduction, capabilities, digital twin visual, CTA | **Implemented** (Interactive Frontend) |
| `/dashboard` | `DashboardShell` | Central operations console: KPIs, live tickets, health overview, PM milestones | **Implemented** (Prototype Simulation) |
| `/dashboard#tickets` | `LiveTicketQueue` | Direct anchor jump to real-time incident queue & SLA monitor | **Implemented** (Interactive Scroll & Active State) |
| `/dashboard#work-orders`| `AssetHealthOverview` | Direct anchor jump to work order recommendations & health breakdown | **Implemented** (Interactive Scroll & Active State) |
| `/dashboard#preventive` | `PreventiveSchedule` | Direct anchor jump to statutory PM inspection calendar | **Implemented** (Interactive Scroll & Active State) |
| `/dashboard#buildings` | `BuildingIncidentDensity`| Direct anchor jump to campus spatial fault density & domain share | **Implemented** (Interactive Scroll & Active State) |
| `/dashboard#telemetry` | `OperationalActivityFeed`| Direct anchor jump to real-time telemetry audit log | **Implemented** (Interactive Scroll & Active State) |
| `/assets` | `AssetRegistryShell` | Institutional asset ledger with table/grid toggle, search, and CSV export | **Implemented** (Interactive In-Memory Ledger) |
| `/assets/new` | `RegisterWizardShell` | 6-step asset onboarding wizard with local draft autosave | **Implemented** (Interactive Multi-Step Form) |
| `/assets/registration-success` | `RegistrationSuccessView` | Onboarding receipt, cryptographic transaction hash, printable QR tag | **Implemented** (Interactive Receipt & Print) |
| `/assets/[assetId]` | `AssetDetailView` | Dynamic asset dossier: QR code, lifecycle timeline, history log, specs | **Implemented** (Dynamic Param Routing) |
| `/signin` | `AuthView` | Institutional authentication with docked state switcher | **Implemented** (Interactive UX Simulation) |
| `/signup` | `SignUpView` | Account onboarding with campus verification code input | **Implemented** (Interactive UX Simulation) |
| `/verify-email` | `VerifyEmailView` | Email token verification with 7-stage QA test bench | **Implemented** (Interactive Diagnostics Bench) |
| `/forgot-password`| `ForgotPasswordView` | Password recovery request form with status feedback | **Implemented** (Interactive Frontend) |
| `/reset-password` | `ResetPasswordView` | New password input with real-time complexity strength meter | **Implemented** (Interactive Frontend) |

---

## Getting Started

### Prerequisites

- **Node.js:** `>= 20.9.0` (Verified via `engines` in `package.json`)
- **Package Manager:** `npm` (Lockfile `package-lock.json` present)
- **PostgreSQL:** Optional for the current prototype; required when running Drizzle migrations.

### Clone & Installation

```bash
# 1. Clone repository
git clone https://github.com/omsharma1905/CampusFix-AI.git
cd campusfix-ai

# 2. Install dependencies
npm install
```

### Environment Variables

Copy the example environment file to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Requirement | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Optional (for prototype) | `postgresql://postgres:postgres@localhost:5432/campusfix` | PostgreSQL connection string for Drizzle ORM |
| `AUTH_SECRET` | Optional (Planned) | `your_secret_key_here` | Session encryption key for planned auth sessions |
| `AUTH_URL` | Optional (Planned) | `http://localhost:3000` | Canonical application base URL for auth redirects |

*Note:* The current frontend prototype executes fully without a live database connection.

### Development Server

Run the development server with Next.js webpack mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### Production Build

To compile an optimized production build:

```bash
# Typecheck, lint, and build Next.js application
npm run build

# Start production server
npm run start
```

---

## Core User Workflows

```
                          ASSET COMMISSIONING WORKFLOW
                          
  [ /dashboard ]  ───►  [ /assets/new ]  ───►  [ Steps 1 to 5 ]  ───►  [ Step 6: Review ]
  Click "Register"       Initialize Draft      Identity, Class,        Custody Gate,
                                               Location, Lifecycle,    Provisional Tag
                                               Maintenance
                                                                               │
                                                                               ▼
  [ /assets/[assetId] ]  ◄───  [ /assets/registration-success ]  ◄───  [ Commit Record ]
  Inspect Full Record          Download Vector SVG Tag,                Generate Permanent ID,
                               Print Staging Label                     Clear Draft
```

### 1. Asset Commissioning Workflow
1. Navigate to `/assets/new` from the dashboard or registry header.
2. Complete Step 01 (Identity & Serial Number), Step 02 (Criticality & Class), Step 03 (Location hierarchy & Custodian), Step 04 (Acquisition & Accounting), and Step 05 (Inspection intervals & Team).
3. In Step 06, review the consolidated record, verify the provisional tag preview, and check the custody confirmation box.
4. On submission, the draft is cleared, a permanent ID (`AST-xxxx`) and transaction reference are generated, and the user is redirected to `/assets/registration-success`.
5. From the confirmation screen, download the SVG asset tag, print the label, or click "Open Asset Record" to view `/assets/AST-xxxx`.

### 2. SLA Incident Inspection Workflow
1. From `/dashboard`, locate an urgent incident in the **Live Ticket Queue** (e.g. `TKT-2026-0891`).
2. Click any table row to slide open the **Ticket Inspection Modal**.
3. Inspect the fault description, location (building/room), assigned technician, and SLA countdown.
4. Click "Update Work Order Status" to simulate dispatch coordination.

### 3. Identity Verification Simulation Workflow
1. Visit `/verify-email`.
2. Inspect the **Prototype QA & Testing Console** docked beneath the verification card.
3. Click any of the 6 scenario presets (Default Pending, Simulate Checking, Rate-Limit Cooldown, Verified Pass, Token Expired, Handshake Error) to observe immediate interface adaptation.
4. Step through the linear 7-stage progressive lifecycle harness to test simulated edge responses.

---

## Design System & UI Ergonomics

CampusFix AI implements a tailored design system engineered for technical density and visual hierarchy.

```
  Midnight Black         Architectural Citron      Electric Cobalt Blue
     #030407                   #C5EA32                   #1558C9
  [ Primary Shell ]        [ Active High-Vis ]       [ Action & Telemetry ]

     #F7F8EF                   #BA1A1A                   #A5A79B
  [ Warm Canvas ]          [ Critical Alert ]        [ Neutral Sage ]
```

### Color Token Architecture
- **Midnight Black (`#030407`):** Grounding dark tone for the vertical capsule rail, high-contrast consoles, and dark mode enclaves.
- **Architectural Citron (`#C5EA32`):** Primary accent color applied to active navigation states, verified telemetry beacons, and primary confirmation buttons. Always paired with `#030407` for high contrast.
- **Electric Cobalt Blue (`#1558C9`):** Accent color indicating system links, primary identity headers, and active filter tags.
- **Warm Canvas (`#F7F8EF`):** Low-strain background surface for high-density tables and data cards.
- **Burgundy Crimson (`#590907` / `#BA1A1A`):** Semantic indicator for critical SLA countdowns and high-voltage alerts.

### Typography
- **Primary Body & Technical Monospace (`Geist`):** Crisp sans-serif for UI labels, table rows, and numerical metrics.
- **Editorial Headlines (`Newsreader`):** Editorial serif typeface for major section headlines, welcoming banners, and high-impact numerical statistics.

### Vertical Capsule Rail Navigation
- Fixed floating capsule on desktop screens (`w-[60px]`, `rounded-[32px]`) positioned with safe workspace padding (`md:pl-20`).
- Contextual floating tooltips on hover with indicator arrows and badge counts.
- Responsive automatic collapse to a hidden drawer on mobile viewports (`<768px`) accessible via the header menu.

---

## Security & Data Lifecycle Guardrails

### 1. Transparent Prototype Boundaries
The current iteration is a **frontend prototype**. While UI elements simulate federated SSO, TLS 1.3 strict enclaves, and cryptographic QR payloads, they represent intended production behavior rather than active cryptographic controls.

### 2. Browser Storage Hygiene
- **Ephemeral Confirmation Receipts:** The registration confirmation payload in `localStorage` (`campusfix_registered_asset_confirmation_v1`) enforces a **24-hour expiration TTL**. Stale receipts are automatically evicted on load.
- **Wizard Draft Eviction:** The registration wizard draft (`campusfix_asset_register_wizard_draft_v1`) enforces a **7-day retention TTL**, preventing old form drafts from colliding with future registration sessions.

### 3. Tenant Isolation Guardrails (Architectural Plan)
Future backend persistence must adhere to strict tenant safety:
- User accounts must be scoped through institutional tenant memberships.
- Asset IDs, buildings, and maintenance logs must enforce foreign-key tenant boundaries.
- Row-Level Security (RLS) is intended as defense-in-depth, supplemented by application-layer tenant validation.

---

## Quality Assurance & Validation

The codebase maintains strict type safety and clean linting rules:

```bash
# 1. Strict TypeScript compilation check (0 errors)
npm run typecheck

# 2. ESLint code analysis (0 warnings, 0 errors)
npm run lint

# 3. Next.js production build compilation
npm run build
```

---

## Current Implementation Status

| Module / Capability | Implementation Status | Notes |
| :--- | :--- | :--- |
| **Landing Page** | `Implemented` | Responsive overview, capabilities grid, digital twin asset |
| **Vertical Capsule Rail Navigation** | `Implemented` | Hash-aware, popstate-synced, mobile drawer responsive |
| **Dashboard KPIs & Metrics** | `Frontend Prototype` | Aggregated from mock datasets; interactive zone filters |
| **Live Ticket Queue & SLA Clocks** | `Frontend Prototype` | Real-time SLA counters; in-modal inspection drawer |
| **Asset Registry (Table/Grid)** | `Frontend Prototype` | Multi-filter engine, bulk selection, dynamic QR preview |
| **CSV Ledger Export** | `Implemented` | Native client-side CSV blob generator and downloader |
| **Asset Registration Wizard (Steps 1–6)**| `Implemented` | Multi-step form, draft autosave, validation gates |
| **Provisional & Permanent QR Generator**| `Implemented` | Vector SVG QR renderer, printable HTML label generator |
| **Asset Detail Dossier** | `Frontend Prototype` | Param-driven route (`/assets/[assetId]`), multi-year lifecycle |
| **Authentication UI & Switchers** | `Frontend Prototype` | Docked prototype consoles; state simulation engines |
| **Email Verification QA Console** | `Frontend Prototype` | 7-stage linear lifecycle test bench |
| **Theme System (Dark/Light)** | `Implemented` | Enclave Dark toggle with localStorage persistence |
| **Database Persistence (PostgreSQL)** | `Configured Scaffolding` | Drizzle client configured; schema pending approval |
| **Live Sensor Telemetry Streams** | `Planned` | Currently simulated with deterministic mock values |
| **Real Email Handshake (SMTP/SES)** | `Planned` | Simulated in prototype test bench |
| **User Role-Based Access Control** | `Planned` | Frontend displays Admin/Technician personas |

---

## Roadmap

### Phase 1 — Frontend Foundation & Prototyping (Completed)
- [x] High-density institutional design system & Tailwind v4 token architecture.
- [x] Responsive layout with vertical capsule rail system and mobile drawer.
- [x] Comprehensive mock data layer for assets, tickets, telemetry, and schedules.
- [x] 6-Step Multi-Tenant Asset Registration Wizard with autosave drafts.
- [x] Dynamic vector QR tag generation, SVG downloads, and print formatting.
- [x] Docked prototype state switchers and email verification diagnostic test bench.

### Phase 2 — Database Persistence & API Integration (Upcoming)
- [ ] Implement approved multi-tenant PostgreSQL schema via Drizzle ORM.
- [ ] Migrate `INITIAL_ASSET_RECORDS` and `TICKETS_DATA` into relational tables.
- [ ] Implement Next.js Server Actions / API route handlers for asset CRUD operations.
- [ ] Persist completed wizard registrations directly into the PostgreSQL database.
- [ ] Deploy database migrations to Supabase or AWS RDS.

### Phase 3 — Authentication & Identity Governance
- [ ] Integrate Auth.js (NextAuth) or Supabase Auth with institutional EduPass / SAML SSO.
- [ ] Implement secure session tokens and middleware-level route protection.
- [ ] Enforce Role-Based Access Control (Admin, Dispatcher, Field Technician, Custodian).
- [ ] Real transactional email verification via AWS SES or Resend.

### Phase 4 — IoT Sensor Telemetry & Automation
- [ ] Connect real-time WebSocket or MQTT broker for physical building management system (BMS) data.
- [ ] Automated incident dispatch when temperature or pressure thresholds deviate.
- [ ] Machine learning-assisted preventive maintenance recommendations.
- [ ] Mobile PWA companion app for offline field technician tag scanning.

---

## Contributing

Contributions to CampusFix AI are welcome. To propose improvements:

1. **Fork the repository** on GitHub.
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/improved-asset-filtering
   ```
3. **Make your changes** following strict TypeScript and design system conventions.
4. **Run validation checks:**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```
5. **Commit your changes:**
   ```bash
   git commit -m "feat: enhance asset registry multi-select filters"
   ```
6. **Push to your branch and open a Pull Request:**
   ```bash
   git push origin feature/improved-asset-filtering
   ```

---

## License

No license has currently been specified for this project. The repository is private and all rights are reserved by the original author. Licensing terms will be published upon open-source release.

---

## Acknowledgements

- **Fonts:** [Geist](https://vercel.com/font) by Vercel and [Newsreader](https://production-type.com/collection/newsreader) by Production Type via Google Fonts.
- **Icons:** [Lucide React](https://lucide.dev/) for open-source iconography.
- **Framework & Tooling:** [Next.js](https://nextjs.org/) team at Vercel, [Tailwind CSS](https://tailwindcss.com/), and [Drizzle ORM](https://orm.drizzle.team/).

---

*CampusFix AI — Engineering intelligent physical infrastructure operations for the modern university campus.*
