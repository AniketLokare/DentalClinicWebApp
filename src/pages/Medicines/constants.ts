import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";

import * as yup from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];


export const medicinesTableColumns: ColumnDef<Medicine, unknown>[] = [
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


export const medicineDefaultFormValues = {
  medicineName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

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

export const getAddEditMedicineBreadCrumbLinks = (isEdit: boolean) => [
  { label: 'Home', path: '/home', href: '/' },
  { label: 'Medicines', path: '/medicines', href: '#' },
  { label: isEdit ? 'Edit Medicine' : 'Add Medicine', path: '#', href: '#' },
];

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
export interface CreateMedicinePayload {
  medicineName: string;
  medicinePack: number;
  medicineType: string;
  medicinePrice: number;
}