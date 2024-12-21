interface Appointment {
  id: string;
  appointmentId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  treatment: string;
  startTime: Date;
  appointmentDate: Date;
  patientmobile1: string;
  cashiername: string;
  timestamp: Date;
}

type CreateAppointmentPayload = Omit<
  Appointment,
  'appointmentId' | 'timestamp' | 'id'
>;
