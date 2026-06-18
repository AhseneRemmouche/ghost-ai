# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome — navbar + sidebar shell (feature spec `02-editor.md`)

## Current Goal

- Build the reusable base chrome that frames every editor screen: top navbar, left project sidebar shell, and a reusable dialog pattern (no concrete dialogs yet).

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
