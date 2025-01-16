interface Patient {
  patientId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  patientAge: number;
  patientGender: string;
  patientRegDate: string;
  patientMobile1: string;
  patientMobile2?: string;
  patientMedicalHistory?: string;
  cashierName: string;
  patientReports?: string;
  timestamp: Date;
}

type CreatePatientPayload = Omit<Patient, 'patientId' | 'timestamp'>;