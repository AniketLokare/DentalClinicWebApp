export const DASHBOARD_PATH = '/';

export const PATIENTS = '/patients';
export const NEW_PATIENT_PATH = '/patients/new';
export const EDIT_PATIENT_PATH = '/patients/:id/edit';
export const getEditPatientRoute = (id: number) => `${PATIENTS}/${id}/edit`;

export const PROCEDURES = '/procedures';
export const MEDICINES = '/medicines';
export const INVENTORY = '/inventory';
export const LOGIN = '/login';
