This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Troubleshooting

### Auth (Clerk) never loads / sign-in form is blank

**Symptom:** The sign-in form and `<UserButton />` render nothing (Clerk stays stuck on
`clerkStatus="loading"`), and requests through the Clerk middleware (`proxy.ts`) take several
seconds each. The browser loads Clerk's assets fine, but server-side calls hang.

**Cause:** A TLS-inspecting security product (corporate firewall or antivirus) re-signs HTTPS
traffic with its own root CA. Your browser trusts that CA (it's in the OS trust store), but
Node.js ships its own bundled CA list and ignores the OS store by default, so every server-side
HTTPS call from the dev server fails certificate verification (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`).
This breaks any Node HTTPS — Clerk's API, the npm registry, `fetch` in route handlers, etc.

**Fix:** Tell Node to trust the OS trust store (Node 22+):

```bash
# Persist for all Node processes (recommended)
# macOS/Linux: add to your shell profile
export NODE_OPTIONS=--use-system-ca
# Windows (user-level, applies to new terminals):
setx NODE_OPTIONS --use-system-ca
```

Quick check that egress works after setting it:

```bash
node --use-system-ca -e "fetch('https://example.com').then(r => console.log(r.status))"
```

This is a per-machine environment quirk, so the flag is intentionally **not** baked into
`package.json` — set it in your environment, not the project config.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ghost-ai
