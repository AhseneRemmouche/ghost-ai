"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

/**
 * Editor home / empty state. Centered prompt to create or open a project; the
 * `New Project` button opens the Create dialog. Intentionally card-free.
 */
export function EditorHome() {
  const { openCreate } = useProjectDialogs();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="space-y-2">
        <h1 className="font-heading text-xl font-semibold text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="max-w-md text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
      </div>

      <Button onClick={openCreate}>
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}
