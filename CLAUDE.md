# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in the `frontend/` package.

## Commands

```bash
npm run dev            # Dev server with Turbopack (localhost:4200)
npm run build          # Production build
npm run lint           # ESLint --fix
npm run storybook      # Storybook dev server (localhost:4100)
npm run api:generate   # Regenerate TypeScript API client from Swagger YAML
npm test               # Vitest + Playwright browser tests
```

## Architecture (Next.js, Feature Sliced Design)

Layers under `src/` (import direction: pages → widgets → features → entities → shared):

- `app/` + `pages/` — Next.js routing; `middleware.ts` handles i18n routing and auth route protection
- `pages/` (FSD) — Assembled page components: `auth/` (multi-step SignUp/SignIn/Recover), `DashboardPage/`, `MessagesPage/`
- `widgets/` — Layout shells: `AppLayout`, `AuthCard`, `Header`, `Footer`
- `features/` — Isolated feature components (e.g., `TopLoader`)
- `entities/` — Domain data models
- `shared/api/` — Auto-generated Axios client (do not hand-edit; regenerate via `api:generate`)
- `shared/components/` — Reusable UI primitives (Button, Input, Toast, etc.)
- `shared/shadcn/` — shadcn/ui components (new-york style, Lucide icons)
- `shared/stores/` — Zustand global state
- `shared/configs/` — i18n (next-intl), WebSocket, TanStack Query client
- `shared/hooks/` — Custom React hooks
- `shared/socket/` — Socket.io client, chat room/event hooks and cache updates

## Data Flow

1. **API:** Calls the backend via the auto-generated Axios client (`shared/api/`). When a new backend endpoint is added, regenerate the client with `npm run api:generate`.
2. **Real-time:** Socket.io connection configured in `shared/socket/` and `shared/configs/`.
3. **Auth:** JWT stored in session cookies; `middleware.ts` protects routes based on the session.
4. **Forms:** React Hook Form + Zod schemas throughout auth flows.
5. **i18n:** next-intl with locale JSON files in `shared/assets/locales/`; routing/navigation helpers in `shared/configs/i18n`.

## Environment Setup

Copy `.env.example` to `.env` and fill in `NEXT_PUBLIC_API_URL` and the reCAPTCHA site key.

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, etc.). When a commit body is needed, write it as a `-` bullet list (one line per change), not prose paragraphs.
- **Formatting:** Prettier (single quotes, trailing commas `all`, print width 100)
- **ESLint:** Flat config (`eslint.config.mjs`)
- **TypeScript:** ES2017 target
