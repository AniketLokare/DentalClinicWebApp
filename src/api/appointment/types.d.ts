interface Appointment {
  id: string;
  appointmentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  treatment: string;
  startTime: Date;
  appointmentDate: Date;
  patientmobile1: string;
  cashiername: string;
  timeStamp: Date;
  appointmentDetails: string;
  }
  
  type CreateAppointmentPayload = Omit<Appointment, 'AppointmentId' | 'AppointmentTime' | 'id'>;