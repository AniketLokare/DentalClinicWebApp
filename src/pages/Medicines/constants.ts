import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";
import * as yup from 'yup';

// Interface for Medicine
export interface Medicine {
  medicineName: string;
  medicinePack: number;
  medicineType: string;
  medicinePrice: number;
}

// Breadcrumbs for listing medicines
export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];

// Columns definition for the medicine table
export const medicinesTableColumns: ColumnDef<Medicine, string | number>[] = [
  {
    header: 'Medicine Name',
    accessorKey: 'medicineName',
  },
  {
    header: 'Medicine Pack',
    accessorKey: 'medicinePack',
  },
  {
    header: 'Medicine Type',
    accessorKey: 'medicineType',
  },
  {
    header: 'Medicine Price',
    accessorKey: 'medicinePrice',
  },
];

// Default form values for creating/updating medicine
export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

// Validation schema for the medicine form
export const medicineFormValidationSchema = yup.object().shape({
  medicineName: yup
    .string()
    .required('Medicine name is required'),

  medicinePack: yup
    .number()
    .transform((value, originalValue) =>
      originalValue ? Number(originalValue) : value
    )
    .typeError('Pack must be a valid number')
    .required('Pack is required')
    .positive('Pack must be a positive number')
    .min(1, 'Pack must be at least 1'),

  medicineType: yup
    .string()
    .required('Type information is required'),

  medicinePrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue ? Number(originalValue) : value
    )
    .typeError('Price must be a valid number')
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be greater than zero'),
});

// Breadcrumbs for adding/editing a medicine
export const getAddEditMedicineBreadCrumbLinks = (isEdit: boolean) => [
  { label: 'Home', path: '/home', href: '/' },
  { label: 'Medicines', path: '/medicines', href: '#' },
  { label: isEdit ? 'Edit Medicine' : 'Add Medicine', path: '#', href: '#' },
];

// Breadcrumbs for viewing medicine details
export const viewMedicineBreadCrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: 'Medicine Details',
    href: '#',
  },
];

// Payload interface for creating medicine
export interface CreateMedicinePayload {
  medicineName: string;
  medicinePack: number;
  medicineType: string;
  medicinePrice: number;
}
