interface Medicine {
  id: string;
  medicineId: number;
  medName: string;
  medicinePack: number;
  medicineType: string;
  medicinePrice: number;
}
type CreateMedicinePayload = Omit<Medicine, 'medicineId' | 'timestamp' | 'id'>;
