export const DASHBOARD_PATH = '/';

export const LOGIN = '/login';

export const UNAUTHORIZED_PATH = '/unauthorized';

export const APPOINTMENTS = '/appointments';
export const NEW_APPOINTMENT_PATH = `${APPOINTMENTS}/new`;
export const EDIT_APPOINTMENT_PATH = `${APPOINTMENTS}/:id/edit`;
export const VIEW_APPOINTMENT_PATH = `${APPOINTMENTS}/:id`;
export const getEditAppointmentRoute = (id: string) => `${APPOINTMENTS}/${id}/edit`;
export const getViewAppointmentPath = (id: string) => `${APPOINTMENTS}/${id}`;

export const PATIENTS = '/patients';
export const NEW_PATIENT_PATH = '/patients/new';
export const EDIT_PATIENT_PATH = '/patients/:id/edit';
export const VIEW_PATIENT_PATH = '/patients/:id';
export const getEditPatientRoute = (id: string) => `${PATIENTS}/${id}/edit`;
export const getViewPatientPath = (id: string) => `${PATIENTS}/${id}`;

export const PROCEDURES = '/procedures';
export const EDIT_PROCEDURE_PATH = '/procedures/:id/edit';
export const VIEW_PROCEDURE_PATH = '/procedures/:id';
export const NEW_PROCEDURE_PATH = '/procedures/new';
export const getNewProcedureRoute = (id: string) => `${NEW_PROCEDURE_PATH}/${id}`;
export const getEditProcedureRoute = (id: string) => `${PROCEDURES}/${id}/edit`;
export const getViewProcedurePath = (id: string) => `${PROCEDURES}/${id}`;

export const USERS = '/users';
export const NEW_USER_PATH = '/users/new';
export const EDIT_USER_PATH = '/users/:id/edit';
export const getEditUserRoute = (id: string) => `${USERS}/${id}/edit`;

export const INVENTORY = '/inventory';

export const MEDICINES = '/medicines';
export const NEW_MEDICINE_PATH = '/medicines/new';
export const EDIT_MEDICINE_PATH = '/medicines/:id/edit';
export const getEditMedicineRoute = (id: string) => `${MEDICINES}/${id}/edit`;

export const PURCHASE_ORDERS = '/purchase-orders';

export const SALES_ORDERS = '/sales-orders';

export const SUPPLIERS = '/suppliers';
export const NEW_SUPPLIER_PATH = '/suppliers/new';
export const EDIT_SUPPLIER_PATH = '/suppliers/:id/edit';
export const getEditSupplierRoute = (id: string) => `${SUPPLIERS}/${id}/edit`;

export const EXTERNAL_PROCEDURE = '/external-procedures';
export const EDIT_EXTERNAL_PROCEDURE_PATH = '/external-procedures/:id/edit';
export const VIEW_EXTERNAL_PROCEDURE_PATH = '/external-procedures/:id';
export const NEW_EXTERNAL_PROCEDURE_PATH = '/external-procedures/new';
export const getNewExternalProcedureRoute = (id: string) => `${NEW_EXTERNAL_PROCEDURE_PATH}/${id}`;
export const getEditExternalProcedureRoute = (id: string) => `${EXTERNAL_PROCEDURE}/${id}/edit`;
export const getViewExternalProcedurePath = (id: string) => `${EXTERNAL_PROCEDURE}/${id}`;

