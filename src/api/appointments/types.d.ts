export interface Appointment {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    treatment: string;
    startTime: Date;
    appointmentDate: Date;
    patientMobile1: string;
    cashierName: string;
    timestamp: Date;
  }
  
   type CreateAppointmentPayload = Omit<Appointment, 'id' | 'timestamp'>;
  