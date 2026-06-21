/**
 * Mock project data for the editor.
 *
 * Feature 04 is UI-only: there are no API calls or persistence yet, so the
 * sidebar and dialogs operate on this in-memory list. Ownership drives which
 * item actions are available — only `owned` projects can be renamed or deleted.
 */

export type ProjectOwnership = "owned" | "shared";

export interface Project {
  id: string;
  name: string;
  slug: string;
  ownership: ProjectOwnership;
}

export const mockProjects: Project[] = [
  {
    id: "proj-payments-platform",
    name: "Payments Platform",
    slug: "payments-platform",
    ownership: "owned",
  },
  {
    id: "proj-realtime-chat",
    name: "Realtime Chat Service",
    slug: "realtime-chat-service",
    ownership: "owned",
  },
  {
    id: "proj-billing-pipeline",
    name: "Billing Pipeline",
    slug: "billing-pipeline",
    ownership: "owned",
  },
  {
    id: "proj-team-wiki",
    name: "Team Wiki Infrastructure",
    slug: "team-wiki-infrastructure",
    ownership: "shared",
  },
  {
    id: "proj-analytics-warehouse",
    name: "Analytics Warehouse",
    slug: "analytics-warehouse",
    ownership: "shared",
  },
];
