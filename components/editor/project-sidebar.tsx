"use client";

import { FolderOpen, Pencil, Plus, Trash2, Users, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  /** Whether the sidebar is visible. */
  isOpen: boolean;
  /** Close the sidebar. */
  onClose: () => void;
}

/** Centered empty state shown inside each tab until projects exist. */
function EmptyState({
  icon: Icon,
  message,
}: {
  icon: typeof FolderOpen;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <Icon className="h-8 w-8 text-copy-faint" />
      <p className="text-sm text-copy-muted">{message}</p>
    </div>
  );
}

/**
 * A single project row. Rename / delete actions are rendered only for owned
 * projects; shared (collaborator) projects expose no item actions.
 */
function ProjectListItem({ project }: { project: Project }) {
  const { openRename, openDelete } = useProjectDialogs();
  const isOwned = project.ownership === "owned";

  return (
    <li className="group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 transition-colors hover:bg-elevated">
      <div className="min-w-0">
        <p className="truncate text-sm text-copy-primary">{project.name}</p>
        <p className="truncate font-mono text-xs text-copy-faint">
          {project.slug}
        </p>
      </div>

      {isOwned ? (
        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => openRename(project)}
            aria-label={`Rename ${project.name}`}
            className="text-copy-secondary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => openDelete(project)}
            aria-label={`Delete ${project.name}`}
            className="text-copy-secondary"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Left project sidebar shell. Floats above the editor canvas as an overlay so
 * opening it never pushes page content, and slides in from the left. On small
 * screens a backdrop scrim sits behind it; tapping the scrim closes the sidebar.
 */
export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { projects, openCreate } = useProjectDialogs();
  const owned = projects.filter((project) => project.ownership === "owned");
  const shared = projects.filter((project) => project.ownership === "shared");

  return (
    <>
      {/* Mobile backdrop scrim — tap outside the sidebar to close it. */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        // When closed the panel is only translated off-screen, so its controls
        // would otherwise stay keyboard-focusable. `inert` removes the whole
        // subtree from both the tab order and the accessibility tree.
        inert={!isOpen}
        className={cn(
          "fixed top-[4.25rem] bottom-3 left-3 z-40 flex w-72 flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface/95 shadow-xl backdrop-blur-md transition-transform duration-200 ease-out supports-backdrop-filter:bg-surface/80",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close projects sidebar"
            className="text-copy-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="my-projects"
          className="flex-1 gap-0 overflow-hidden p-3"
        >
          <TabsList className="w-full">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <div className="mt-3 flex-1 overflow-y-auto">
            <TabsContent value="my-projects">
              {owned.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {owned.map((project) => (
                    <ProjectListItem key={project.id} project={project} />
                  ))}
                </ul>
              ) : (
                <EmptyState icon={FolderOpen} message="No projects yet." />
              )}
            </TabsContent>
            <TabsContent value="shared">
              {shared.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {shared.map((project) => (
                    <ProjectListItem key={project.id} project={project} />
                  ))}
                </ul>
              ) : (
                <EmptyState icon={Users} message="No shared projects yet." />
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="border-t border-surface-border p-3">
          <Button className="w-full" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
