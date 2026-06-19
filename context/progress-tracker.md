# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Authentication — Clerk integration (feature spec `03-auth.md`)

## Current Goal

- Wire Clerk into the app: `ClerkProvider` (dark theme + CSS-variable appearance), sign-in/sign-up pages, root redirects, route protection via `proxy.ts`, and the `UserButton` in the editor navbar.

## Completed

- Boilerplate cleanup: stripped `globals.css`, removed unused public SVGs, minimal `app/page.tsx`.
- Feature `01-design-system`:
  - Configured shadcn/ui (`components.json`, radix base, Nova preset, `@/` alias).
  - Added primitives to `components/ui/`: button, card, dialog, input, tabs, textarea, scroll-area (unmodified after generation).
  - Installed `lucide-react` (plus `clsx`, `tailwind-merge`, `class-variance-authority`, `radix-ui`, `tw-animate-css`).
  - Added `lib/utils.ts` with `cn()` (clsx + tailwind-merge).
  - Established the dark-only theme in `app/globals.css`: project palette tokens from `ui-context.md`, mapped to both shadcn semantic tokens and project Tailwind utility names via `@theme inline`. Dark is the default (`:root, .dark`) with `class="dark"` on `<html>`; fixed the font tokens to the loaded Geist variables.
  - Verified: `tsc --noEmit` clean and `next build` succeeds.
- Feature `02-editor` (base editor chrome):
  - `components/editor/editor-navbar.tsx` — fixed-height navbar; left/center/right; sidebar toggle (`PanelLeftOpen`/`PanelLeftClose`); right empty; `bg-surface` + bottom border.
  - `components/editor/project-sidebar.tsx` — floating overlay (does not push content), slides in from left; `isOpen`/`onClose`; `Projects` header + close; `Tabs` (My Projects / Shared) with empty placeholders; full-width `New Project` button with `Plus`.
  - `components/editor/editor-dialog.tsx` — reusable dialog pattern (title/description/footer) using theme tokens; no concrete dialogs built.
  - Verified: `tsc --noEmit` and `eslint components/editor` both clean. (`next lint` is removed in Next 16; the project lints via the `eslint` CLI.)
- Feature `03-auth` (Clerk integration):
  - Installed `@clerk/ui`; `dark` theme from `@clerk/ui/themes` applied via `appearance={{ theme: dark, variables: {...} }}` (this Clerk v7 uses `theme`, not `baseTheme`). Appearance variables are driven by app CSS variables (`var(--accent-primary)`, etc.) — no hardcoded colors.
  - `proxy.ts` at project root (Next 16 renamed `middleware`→`proxy`): `clerkMiddleware` + `createRouteMatcher`; protects everything except the public auth routes, which are derived from `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL`.
  - Added those two standard Clerk URL env vars to `.env.local` (they were absent); no custom names invented.
  - `ClerkProvider` wraps the root layout.
  - Auth pages: `app/sign-in/[[...sign-in]]` and `app/sign-up/[[...sign-up]]` render Clerk `<SignIn>`/`<SignUp>` inside `components/auth/auth-shell.tsx` — two-panel on large screens (brand panel + centered form), form-only on small screens.
  - `/` redirects via `await auth()`: signed-in → `/editor`, otherwise → `/sign-in`.
  - `UserButton` added to the editor navbar right section.
  - Restored `/editor` route wiring (`editor-shell` + `app/editor/layout.tsx` + `page.tsx`) since auth redirects there and the navbar/UserButton render inside it.
  - Verified: `npm run build` passes; in-browser, `/editor` redirects unauthenticated users to `/sign-in?redirect_url=...` and the sign-in page renders the dark-themed two-panel layout.
- Auth UI refinement + font fix:
  - Fonts: switched from `next/font/google` to the self-hosted `geist` package (`geist/font/sans`, `geist/font/mono`) — same `--font-geist-sans`/`--font-geist-mono` vars. Google Fonts is unreachable here, so the old setup fell back to system fonts; build no longer needs `--use-system-ca`.
  - `auth-shell.tsx` redesigned to match the target screenshot: 50/50 split, neutral lighter-surface left panel (`bg-surface`, differentiated from the near-black right), brand logo mark, `text-3xl` headline + subtitle, three icon+title+description feature items, and a copyright footer. Small screens remain form-only. Heading/subtitle widths tuned so line wraps match the screenshot.
  - Clerk form scaled up via appearance variables (`fontSize: 1rem`, `spacing: 1.1rem`) — the defaults (13px / 1rem) read too small in the half-width auth panel on large screens.
  - Left-panel paragraph text (subtitle + feature titles/descriptions) bumped from `text-sm` to 16px for readability against the enlarged form.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Dark-only theme: design tokens live in `app/globals.css` as CSS custom properties and are exposed through `@theme inline`; app components reference Tailwind token utilities (`bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, etc.) rather than raw colors. `components/ui/*` are treated as protected generated files.

## Session Notes

- The shadcn registry and `next/font/google` require `NODE_OPTIONS=--use-system-ca` in this environment (corporate TLS interception) for CLI/network steps and builds. (Fonts are now self-hosted via `geist`, so builds no longer need this flag for fonts.)
- Token gotcha: `--color-base` makes the `text-base` utility ambiguous (Tailwind can't tell the 16px font-size from the `base` color). Use `text-[1rem]` (or another size) for 16px text instead of `text-base`.
