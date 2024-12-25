interface purchaseTransaction{
medtransactionId: number;
  medicineName: string;
  medicineId: number;
  invoiceId: number;
  medicineBatch: string;
  expiry: Date;
  medicinePack: number;
  quantity: number;
  availableQuantity: number;
  mrp: number;
  rate: number;
  amount: number;
}
type CreatePuchaseTransactionPayload = Omit<purchaseTransaction, 'medtransactionId' | 'medicineId' | 'invoiceId'>;
