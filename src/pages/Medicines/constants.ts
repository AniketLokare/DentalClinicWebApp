import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";

import * as yup from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];


export const medicinesTableColumns: ColumnDef<User, string>[] = [
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
    header: 'medicine Price',
    accessorKey: 'medicinePrice',
  },
];


export const medicineDefaultFormValues = {
  name: '',
  pack: '',
  type:'',
  price: 0,
};

export const medicineFormValidationSchema = yup.object().shape({
  name: yup.string().required('Medicine name is required'),
  pack: yup.string().required('Pack is required'),
  type: yup.string().required('type information is required'),
  price: yup.number().required('Price is required').positive('Must be a positive number'),
});

export const getAddEditMedicineBreadCrumbLinks = (isEdit: boolean) => [
  { label: 'Home', path: '/home',href:'/' },
  { label: 'Medicines', path: '/medicines' },
  { label: isEdit ? 'Edit Medicine' : 'Add Medicine', path: '#' },
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
  name: string;
  pack: string;
  type: string;
  price: number;
}