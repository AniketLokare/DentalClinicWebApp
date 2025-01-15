interface Procedure {
  patientId: number;
  procedureId: number;
  procedureCashierName: string;
  cashPayment: number;
  clinicName: string;
  discount: number;
  finalAmount: number;
  procedureDate: string;
  onlinePayment: number;
  procedureDetail: string;
  procedureType: string;
  totalAmount: number;
  timestamp: Date;
  cashierName: string;
}

<<<<<<< HEAD
type CreateProcedurePayload = Omit<procedure, 'procedureId' | 'patientId' | 'timestamp'>;
=======
type CreateProcedurePayload = Omit<procedure, 'proceduretId' | 'procedureTime' | 'id'>;
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
