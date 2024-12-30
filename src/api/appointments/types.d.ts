interface Appointments {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    treatment: string;
    startTime: Date;
    appointmentDate: Date;
    procedureDate: Date;
    onlinePayment: number;
    procedureDetails: string;
    procedureType: string;
    procedureTime: Date;
    totalAmount: number;
    patientName: string;
    timeStamp: Date;
}

type CreateProcedurePayload = Omit<procedure, 'proceduretId' | 'procedureTime' | 'id'>;
