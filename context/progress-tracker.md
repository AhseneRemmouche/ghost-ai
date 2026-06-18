# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Design system and UI primitives (feature spec `01-design-system.md`)

## Current Goal

- Install and configure shadcn/ui, add core UI primitive components, add `lucide-react`, and provide a `cn()` helper, all matching the dark-only theme.

## Completed

- Boilerplate cleanup: stripped `globals.css`, removed unused public SVGs, minimal `app/page.tsx`.
- Feature `01-design-system`:
  - Configured shadcn/ui (`components.json`, radix base, Nova preset, `@/` alias).
  - Added primitives to `components/ui/`: button, card, dialog, input, tabs, textarea, scroll-area (unmodified after generation).
  - Installed `lucide-react` (plus `clsx`, `tailwind-merge`, `class-variance-authority`, `radix-ui`, `tw-animate-css`).
  - Added `lib/utils.ts` with `cn()` (clsx + tailwind-merge).
  - Established the dark-only theme in `app/globals.css`: project palette tokens from `ui-context.md`, mapped to both shadcn semantic tokens and project Tailwind utility names via `@theme inline`. Dark is the default (`:root, .dark`) with `class="dark"` on `<html>`; fixed the font tokens to the loaded Geist variables.
  - Verified: `tsc --noEmit` clean and `next build` succeeds.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Dark-only theme: design tokens live in `app/globals.css` as CSS custom properties and are exposed through `@theme inline`; app components reference Tailwind token utilities (`bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, etc.) rather than raw colors. `components/ui/*` are treated as protected generated files.

## Session Notes

- The shadcn registry and `next/font/google` require `NODE_OPTIONS=--use-system-ca` in this environment (corporate TLS interception) for CLI/network steps and builds.
