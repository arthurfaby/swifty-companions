// Définition du type Project
export type Project = {
    id: number;
    name: string;
    parent_id: number | null;
    slug: string;
};

// Définition du type ProjectStatus
export type ProjectStatus = {
    created_at: string;
    current_team_id: number;
    cursus_ids: number[];
    final_mark: number | null;
    id: number;
    marked: boolean;
    marked_at: string | null;
    occurrence: number;
    project: Project;
    retriable_at: string | null;
    status: "finished" | "in_progress";
    updated_at: string;
    "validated?": boolean | null;
};

// Définition du type ProjectStatusList
export type ProjectStatusList = ProjectStatus[];
