"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockProjects, type Project } from "@/lib/projects";
import { slugify } from "@/lib/slug";

type DialogKind = "create" | "rename" | "delete";

interface ProjectDialogsContextValue {
  /** In-memory mock project list (no API / persistence). */
  projects: Project[];
  /** Which dialog is open, or `null` when none is. */
  openDialog: DialogKind | null;
  /** Project targeted by the rename / delete dialog. */
  activeProject: Project | null;
  /** Name field shared by the create / rename forms. */
  name: string;
  setName: (value: string) => void;
  /** Live slug derived from `name`, for the Create preview. */
  slugPreview: string;
  /** True while a submit is in flight (mock submits resolve immediately). */
  isSubmitting: boolean;
  openCreate: () => void;
  openRename: (project: Project) => void;
  openDelete: (project: Project) => void;
  closeDialog: () => void;
  submitCreate: () => void;
  submitRename: () => void;
  submitDelete: () => void;
}

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | null>(
  null
);

/**
 * Owns all project-dialog state so the editor home button and the sidebar
 * item actions can drive the same dialogs. Wraps the editor shell.
 */
export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [openDialog, setOpenDialog] = useState<DialogKind | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slugPreview = slugify(name);

  const closeDialog = useCallback(() => {
    setOpenDialog(null);
    setActiveProject(null);
    setName("");
    setIsSubmitting(false);
  }, []);

  const openCreate = useCallback(() => {
    setActiveProject(null);
    setName("");
    setOpenDialog("create");
  }, []);

  const openRename = useCallback((project: Project) => {
    setActiveProject(project);
    setName(project.name);
    setOpenDialog("rename");
  }, []);

  const openDelete = useCallback((project: Project) => {
    setActiveProject(project);
    setName(project.name);
    setOpenDialog("delete");
  }, []);

  const submitCreate = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setIsSubmitting(true);
    // Mock only: prepend to the in-memory list, no API / persistence.
    const project: Project = {
      id: `proj-${slugify(trimmed)}-${crypto.randomUUID().slice(0, 8)}`,
      name: trimmed,
      slug: slugify(trimmed),
      ownership: "owned",
    };
    setProjects((prev) => [project, ...prev]);
    closeDialog();
  }, [name, closeDialog]);

  const submitRename = useCallback(() => {
    const trimmed = name.trim();
    if (!activeProject || !trimmed) return;
    setIsSubmitting(true);
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? { ...project, name: trimmed, slug: slugify(trimmed) }
          : project
      )
    );
    closeDialog();
  }, [name, activeProject, closeDialog]);

  const submitDelete = useCallback(() => {
    if (!activeProject) return;
    setIsSubmitting(true);
    setProjects((prev) =>
      prev.filter((project) => project.id !== activeProject.id)
    );
    closeDialog();
  }, [activeProject, closeDialog]);

  const value = useMemo<ProjectDialogsContextValue>(
    () => ({
      projects,
      openDialog,
      activeProject,
      name,
      setName,
      slugPreview,
      isSubmitting,
      openCreate,
      openRename,
      openDelete,
      closeDialog,
      submitCreate,
      submitRename,
      submitDelete,
    }),
    [
      projects,
      openDialog,
      activeProject,
      name,
      slugPreview,
      isSubmitting,
      openCreate,
      openRename,
      openDelete,
      closeDialog,
      submitCreate,
      submitRename,
      submitDelete,
    ]
  );

  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  );
}

export function useProjectDialogs(): ProjectDialogsContextValue {
  const context = useContext(ProjectDialogsContext);
  if (!context) {
    throw new Error(
      "useProjectDialogs must be used within a ProjectDialogsProvider"
    );
  }
  return context;
}
