"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorDialog } from "@/components/editor/editor-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

/**
 * The three project dialogs (Create / Rename / Delete), driven entirely by
 * `useProjectDialogs`. Mounted once inside the provider so every trigger —
 * editor home and sidebar — shares the same state.
 */
export function ProjectDialogs() {
  const {
    openDialog,
    activeProject,
    name,
    setName,
    slugPreview,
    isSubmitting,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  } = useProjectDialogs();

  const createNameId = useId();
  const renameNameId = useId();

  // Radix only calls onOpenChange(false) on dismiss; route it to closeDialog.
  const handleOpenChange = (open: boolean) => {
    if (!open) closeDialog();
  };

  return (
    <>
      {/* Create */}
      <EditorDialog
        open={openDialog === "create"}
        onOpenChange={handleOpenChange}
        title="Create project"
        description="Name your workspace — the URL slug is generated automatically."
        footer={
          <>
            <Button variant="ghost" type="button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={submitCreate}
              disabled={!name.trim() || isSubmitting}
            >
              Create project
            </Button>
          </>
        }
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            submitCreate();
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={createNameId}
              className="text-sm font-medium text-copy-secondary"
            >
              Project name
            </label>
            <Input
              id={createNameId}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Payments Platform"
              autoFocus
            />
          </div>
          <p className="text-xs text-copy-muted">
            Slug preview:{" "}
            <span className="font-mono text-copy-secondary">
              {slugPreview || "your-project-slug"}
            </span>
          </p>
          <button type="submit" className="hidden" tabIndex={-1} aria-hidden />
        </form>
      </EditorDialog>

      {/* Rename */}
      <EditorDialog
        open={openDialog === "rename"}
        onOpenChange={handleOpenChange}
        title="Rename project"
        description={
          activeProject
            ? `Renaming “${activeProject.name}”.`
            : undefined
        }
        footer={
          <>
            <Button variant="ghost" type="button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={submitRename}
              disabled={!name.trim() || isSubmitting}
            >
              Save changes
            </Button>
          </>
        }
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            submitRename();
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={renameNameId}
              className="text-sm font-medium text-copy-secondary"
            >
              Project name
            </label>
            <Input
              id={renameNameId}
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="hidden" tabIndex={-1} aria-hidden />
        </form>
      </EditorDialog>

      {/* Delete */}
      <EditorDialog
        open={openDialog === "delete"}
        onOpenChange={handleOpenChange}
        title="Delete project"
        description={
          activeProject
            ? `“${activeProject.name}” will be permanently deleted. This cannot be undone.`
            : undefined
        }
        footer={
          <>
            <Button variant="ghost" type="button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={submitDelete}
              disabled={isSubmitting}
            >
              Delete project
            </Button>
          </>
        }
      />
    </>
  );
}
