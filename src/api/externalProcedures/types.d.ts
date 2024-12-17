interface ExternalProcedure {
  doctorId: number,
  doctorName: string,
  procedureDate?: Date,
  procedureType: string,
  procedureDetail: string,
  feesCharged: number,
  discount?: number,
  finalAmount: number,
  cashierName?: string,
  timestamp?: Date
}

type CreateExternalProcedurePayload = Omit<ExternalProcedure, 'doctorId' | 'timestamp'>;
