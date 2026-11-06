# CampusFix AI — Phase 1 scaffold

## Stack
Next.js 16.4.5 App Router, React 19.2, TypeScript 5, Tailwind CSS 4, PostgreSQL, Drizzle ORM, Zod and Lucide React.

## Run
Requires Node.js 20.9+ and PostgreSQL.

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL in .env.local
npm run dev
```

## Validate
```bash
npm run typecheck
npm run lint
npm run build
```

## Guardrails
- Global user identity is separate from institution memberships.
- Every tenant-owned record must use tenant-safe relationships.
- Never trust client-provided tenant IDs or roles for authorization.
- RLS is defense in depth, not the only authorization layer.
- Do not create migrations from the old v1.0 schema; approve the corrected schema and ERD first.
- No fake customers, fabricated telemetry or demo metrics in production UI.

## Scaffold status
App Router, strict TypeScript, design tokens, initial application shell and Drizzle/PostgreSQL boundary are included. Dependency installation, lockfile generation, CI, database connection and automated checks must be completed in the target development environment.
