interface Medicine {
  medicineId: string;
  medicineName: string;
  medicineType: string;
  medicineStrip: number;
  quantity: number;
}

type CreateMedicinePayload = Omit<Medicine, 'medicineId'>;