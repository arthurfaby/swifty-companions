import { ProjectStatusList } from './ProjectStatus';
import { Skill } from './Skill';

export interface User42 {
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    usual_full_name: string | null;
    usual_first_name: string | null;
    url: string;
    phone: string | null;
    displayname: string;
    kind: string;
    image: {
        link: string;
        versions: {
            large: string;
            medium: string;
            small: string;
            micro: string;
        };
    };
    "staff?": boolean;
    correction_point: number;
    location: string | null;
    wallet: number;
    anonymize_date: string | null;
    data_erasure_date: string | null;
    created_at: string;
    updated_at: string;
    alumnized_at: string | null;
    "alumni?": boolean;
    "active?": boolean;
    groups: any[]; // Vous pouvez définir un type plus précis si nécessaire
    cursus_users: Array<{
        id: number;
        begin_at: string;
        end_at: string | null;
        grade: string | null;
        level: number;
        skills: Array<Skill>; // Vous pouvez définir un type plus précis si nécessaire
        cursus_id: number;
        has_coalition: boolean;
        user: {
            id: number;
            login: string;
            url: string;
        };
        cursus: {
            id: number;
            created_at: string;
            name: string;
            slug: string;
        };
    }>;
    projects_users: ProjectStatusList; // Vous pouvez définir un type plus précis si nécessaire
    languages_users: Array<{
        id: number;
        language_id: number;
        user_id: number;
        position: number;
        created_at: string;
    }>;
    achievements: any[]; // Vous pouvez définir un type plus précis si nécessaire
    titles: any[]; // Vous pouvez définir un type plus précis si nécessaire
    titles_users: any[]; // Vous pouvez définir un type plus précis si nécessaire
    partnerships: any[]; // Vous pouvez définir un type plus précis si nécessaire
    patroned: Array<{
        id: number;
        user_id: number;
        godfather_id: number;
        ongoing: boolean;
        created_at: string;
        updated_at: string;
    }>;
    patroning: any[]; // Vous pouvez définir un type plus précis si nécessaire
    expertises_users: Array<{
        id: number;
        expertise_id: number;
        interested: boolean;
        value: number;
        contact_me: boolean;
        created_at: string;
        user_id: number;
    }>;
    roles: any[]; // Vous pouvez définir un type plus précis si nécessaire
    campus: Array<{
        id: number;
        name: string;
        time_zone: string;
        language: {
            id: number;
            name: string;
            identifier: string;
            created_at: string;
            updated_at: string;
        };
        users_count: number;
        vogsphere_id: number;
    }>;
    campus_users: Array<{
        id: number;
        user_id: number;
        campus_id: number;
        is_primary: boolean;
    }>;
}
