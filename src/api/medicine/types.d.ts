interface Medicine {
  id: string;            // Medicine ID (string type, required)
  medicineId: number;    // Medicine Unique ID (required)
  medicineName: string;  // Medicine Name (required)
  medicinePack: number;  // Medicine Pack Quantity (required)
  medicineType: string;  // Medicine Type (required)
  medicinePrice: number; // Medicine Price (required)
}

type CreateMedicinePayload = Omit<Medicine, 'medicineId' | 'id'>;