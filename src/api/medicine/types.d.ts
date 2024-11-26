interface Medicine {
  id : string;
  medicineId: number;
  medicineName: string;
  medicineType: string;
  medicinePack: number;
  medicineQuantity: number;
}

type CreateMedicinePayload = Omit<Medicine, 'medicineId' | 'id'>;