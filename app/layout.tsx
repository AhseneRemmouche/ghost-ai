import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Real-time collaborative system design workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        // Drive Clerk's palette from the app's existing CSS variables so the
        // auth UI tracks the dark theme — no hardcoded colors.
        variables: {
          colorPrimary: "var(--accent-primary)",
          colorPrimaryForeground: "var(--bg-base)",
          colorBackground: "var(--bg-surface)",
          colorForeground: "var(--text-primary)",
          colorMuted: "var(--bg-subtle)",
          colorMutedForeground: "var(--text-muted)",
          colorNeutral: "var(--text-primary)",
          colorBorder: "var(--border-default)",
          colorInput: "var(--bg-elevated)",
          colorInputForeground: "var(--text-primary)",
          colorRing: "var(--accent-primary)",
          colorDanger: "var(--state-error)",
          colorSuccess: "var(--state-success)",
          colorWarning: "var(--state-warning)",
          fontFamily: "var(--font-geist-sans)",
          // Scale the whole form up — the defaults (13px / 1rem spacing) read
          // small in the half-width auth panel on large screens.
          fontSize: "1rem",
          spacing: "1.1rem",
        },
      }}
    >
      <html
        lang="en"
        className={`dark ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
