interface Appointments {
    id: string;
    appointmentId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    treatment: string;
    startTime: Date;
    appointmentDate: Date;
    patientMobile1: string;
    cashierName: string;
    timestamp: Date;
}

type CreateAppointmentsPayload = Omit<Appointments, 'appointmentId' | 'timestamp' | 'id'>;
