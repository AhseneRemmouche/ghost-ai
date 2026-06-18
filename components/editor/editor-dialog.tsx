"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditorDialogProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the open state should change (overlay click, escape, close). */
  onOpenChange: (open: boolean) => void;
  /** Dialog heading. */
  title: string;
  /** Optional supporting copy under the title. */
  description?: string;
  /** Body content. */
  children?: ReactNode;
  /** Optional footer actions (e.g. confirm / cancel buttons). */
  footer?: ReactNode;
}

/**
 * Reusable modal shell for the editor, styled with the dark theme tokens from
 * `globals.css`. Concrete dialogs compose this rather than wiring up the shadcn
 * primitive directly. No concrete dialogs exist yet — this is the shared pattern.
 */
export function EditorDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: EditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-surface-border bg-elevated text-copy-primary">
        <DialogHeader>
          <DialogTitle className="text-copy-primary">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-copy-muted">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {children}

        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
