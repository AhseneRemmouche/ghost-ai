import type { ReactNode } from "react";
import { FileText, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

/**
 * Two-panel frame for the auth screens.
 *
 * Large screens: a tinted brand panel on the left (logo, headline, feature
 * list, footer) and a centered Clerk form on the right — a 50/50 split.
 * Small screens: the brand panel is hidden and only the form shows.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel — large screens only */}
      <aside className="hidden flex-col border-r border-surface-border bg-surface px-12 py-10 lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-lg bg-brand" />
          <span className="text-base font-semibold text-copy-primary">
            Ghost AI
          </span>
        </div>

        {/* Centered content */}
        <div className="flex flex-1 flex-col justify-center gap-10">
          <div className="space-y-4">
            <h1 className="font-heading max-w-sm text-3xl font-semibold leading-tight tracking-tight text-copy-primary">
              Design systems at the speed of thought.
            </h1>
            <p className="max-w-124 text-[1rem] leading-relaxed text-copy-muted">
              Describe your architecture in plain English. Ghost AI maps it to a
              shared canvas your whole team can refine in real time.
            </p>
          </div>

          <ul className="space-y-5">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-dim text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-0.5">
                  <p className="text-[1rem] font-medium text-copy-primary">
                    {title}
                  </p>
                  <p className="text-[1rem] leading-relaxed text-copy-muted">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs text-copy-faint">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </aside>

      {/* Centered Clerk form */}
      <div className="flex items-center justify-center px-6 py-16">
        {children}
      </div>
    </main>
  );
}
