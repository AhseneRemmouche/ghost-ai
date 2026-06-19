"use client";

import { useState, type ReactNode } from "react";

import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";

interface EditorShellProps {
  children: ReactNode;
}

/**
 * Client composition that frames every editor screen: the top navbar and the
 * floating project sidebar share a single open/closed state here, while the
 * canvas (route content) renders underneath as `children`.
 */
export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />

      <div className="relative flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
