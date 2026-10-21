# JR FINSERV Platform

## Project Overview

JR FINSERV Platform is a production-ready foundation for a financial services management platform built with Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React, Prisma, PostgreSQL, Firebase Storage, and Better Auth.

This repository currently contains only the project foundation. It does not include business pages, dashboards, authentication flows, database models, or sample business data.

## Technology Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui configuration
- Framer Motion
- Lucide React
- Next.js Server Actions and API Routes
- PostgreSQL configuration only
- Prisma configuration only
- Firebase Storage configuration only
- Better Auth configuration only
- pnpm
- GitHub
- Hostinger VPS deployment target

## Installation

1. Install Node.js 20 or newer.
2. Install pnpm.
3. Run `pnpm install`.
4. Copy `.env.example` to `.env.local` and fill in environment values.
5. Run `pnpm dev`.

## Folder Structure

```text
app/
components/
components/ui/
components/common/
components/layout/
components/cards/
components/forms/
components/charts/
components/tables/
features/
features/home/
features/about/
features/services/
features/gallery/
features/contact/
features/client/
features/admin/
features/auth/
features/ai/
lib/
services/
hooks/
types/
utils/
config/
constants/
public/
styles/
prisma/
firebase/
middleware/
```

## Development Workflow

- `pnpm dev` starts the local development server.
- `pnpm lint` runs lint checks.
- `pnpm typecheck` validates TypeScript types.
- `pnpm build` prepares the production build.
- `pnpm format` formats the codebase.
- `pnpm db:generate` runs Prisma client generation.

## Git Commands

- `git status` checks the current workspace state.
- `git add .` stages the initialized foundation.
- `git commit -m "Initialize project foundation"` records the scaffold.
- `git branch` reviews active branches.