interface Appointment {
    id: string;
    appointmentId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    treatment: string;
    startTime: number;
    appointmentDate: Date;
    patientMobile1: string;
    cashierName: string;
    timestamp: Date;
  }
  
  type CreateAppointmentPayload = Omit<Appointment, 'appointmentId' | 'timestamp' | 'id'>;
  