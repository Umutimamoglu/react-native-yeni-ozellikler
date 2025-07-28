// src/types/index.ts

export interface MaintenanceRecord {
    id: number;
    plate: string;
    date: string;
    km: string;
    type: 'Periyodik' | 'Arıza';
    technician: string;
    status: 'completed' | 'pending';
}

export interface CheckItem {
    status: boolean | null;
    notes: string;
}

export interface FormData {
    plate: string;
    date: string;
    km: string;
    type: 'Periyodik' | 'Arıza';
    technician: string;
    checks: {
        [key: string]: CheckItem;
    };
    completedWork: string;
    postTests: {
        [key: string]: CheckItem;
    };
}