"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  /** Whether the project sidebar is currently open. */
  isSidebarOpen: boolean;
  /** Toggle the project sidebar open/closed. */
  onToggleSidebar: () => void;
}

/**
 * Fixed-height top chrome shared by every editor screen.
 *
 * Three sections — left holds the sidebar toggle, center and right are
 * reserved for future controls (right intentionally empty for now).
 */
export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
}: EditorNavbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border bg-surface px-3">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-pressed={isSidebarOpen}
          className="text-copy-secondary"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center */}
      <div className="flex flex-1 items-center justify-center" />

      {/* Right — profile / account menu */}
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </header>
  );
}
