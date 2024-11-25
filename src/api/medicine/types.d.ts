// src/api/medicine/types.d.ts
export interface Medicine {
  id: string;            // Medicine ID (string type, required)
  medicineId: number;    // Medicine Unique ID (required)
  medicineName: string;  // Medicine Name (required)
  medicinePack: number;  // Medicine Pack Quantity (required)
  medicineType: string;  // Medicine Type (required)
  medicinePrice: number; // Medicine Price (required)
}

// CreateMedicinePayload should omit the 'medicineId' and 'id' fields
export type CreateMedicinePayload = Omit<Medicine, 'medicineId' | 'id'>;
