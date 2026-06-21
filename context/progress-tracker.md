# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Project Dialogs — editor home screen + project create/rename/delete dialogs (feature spec `04-project-dialogs.md`)

## Current Goal

- Build the `/editor` home screen (heading, description, `New Project` action) and the project create/rename/delete dialogs, with sidebar item actions and a mobile backdrop scrim. Mock project data only — no API calls or persistence.

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
- Spec-compliance pass against `03-auth.md` (2026-06-20):
  - Re-audited the implementation against the spec; all items already matched except the left-panel feature list.
  - Per the spec's "short text-only feature list" / "no feature cards", converted the `auth-shell.tsx` feature list to **text-only** — removed the lucide icons and the `bg-accent-dim` icon chips, keeping title + description as plain text. This intentionally reverts the earlier screenshot-driven icon design in favour of literal spec compliance.
  - Re-verified the spec's "Check When Done" gate: `proxy.ts` at root; all routes protected except the env-derived public auth paths; auth pages use CSS-variable tokens only (no hardcoded colors); `ClerkProvider` wraps the root layout; `npm run build` passes.
- Feature `04-project-dialogs` (editor home + project dialogs):
  - `lib/slug.ts` — pure `slugify()` powering the live Create-dialog slug preview (lowercases, strips diacritics, collapses non-alphanumerics to single hyphens).
  - `lib/projects.ts` — `Project` type + in-memory mock list with `ownership` (`owned` / `shared`). No API or persistence.
  - `hooks/use-project-dialogs.tsx` — `ProjectDialogsProvider` + `useProjectDialogs()` managing dialog state, the shared name form field, loading state, and the mock project list (in-memory create/rename/delete). Shared so the editor home button and sidebar drive the same dialogs.
  - `components/editor/project-dialogs.tsx` — Create (name input + live slug preview), Rename (prefilled input, current name in the description, autofocus, Enter submits), Delete (destructive confirmation, no input, destructive confirm button). Built on the existing `EditorDialog` shell.
  - `components/editor/editor-home.tsx` + `app/editor/page.tsx` — editor home (heading `Create a project or open an existing one`, description, `New Project` + `Plus` → Create dialog); replaced the `Canvas coming soon` placeholder; not wrapped in cards.
  - `components/editor/editor-shell.tsx` — wraps the shell in `ProjectDialogsProvider` and mounts `<ProjectDialogs />` once.
  - `components/editor/project-sidebar.tsx` — renders the mock project lists per tab; rename/delete actions on owned items only (hidden for shared/collaborator); footer `New Project` → Create; mobile-only backdrop scrim that closes the sidebar on outside tap. Existing open/close behaviour unchanged.
  - Verified: `tsc --noEmit` clean and `eslint` clean (the spec's "Check When Done"). In-browser: editor home renders, sidebar lists the 3 owned mock projects with wired Rename/Delete actions (and two `New Project` triggers); `slugify` confirmed via unit-style checks. Dialog open/close exercised; deeper in-browser dialog screenshots were blocked by an unrelated dev-page idle/freeze in the automation tool.

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
