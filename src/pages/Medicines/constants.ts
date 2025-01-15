<<<<<<< HEAD
import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";
import { object as yupObject, ObjectSchema, number, string } from "yup";

export const listMedicinesBreadcrumbLinks = [
  { 
=======
import { ColumnDef } from '@tanstack/react-table';
import { MEDICINES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import * as yup from 'yup';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
    label: 'Medicines',
    href: MEDICINES,
  },
];

<<<<<<< HEAD
export const getAddEditBreadCrumbLinks = (isEdit = false) => [
=======
export const getAddEditMedicinesBreadcrumbLinks = (isEdit = false) => [
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
<<<<<<< HEAD
    label: isEdit ? 'Edit Medicine' : 'New Medicine',
=======
    label: isEdit ? 'Edit Medicine' :'New Medicine',
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
    href: '#',
  },
];

<<<<<<< HEAD

export const medicinesTableColumns: ColumnDef<Medicine, string>[] = [
=======
export const viewMedicineBreadCrumbLinks = [
  {
    label: 'Medicine',
    href: MEDICINES,
  },
  {
    label: 'Medicine Details',
    href: '#',
  },
];

export const medicinesTableColumns: ColumnDef<User, string>[] = [
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
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
<<<<<<< HEAD
    header: 'medicine Quantity',
    accessorKey: 'quantity',
  },
];

export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicineType: '',
  medicinePack: 0,
  quantity: 0,
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: string()
    .required('Medicine name is required'),

    medicineType: string()
    .required('Medicine Type is required'),

    medicinePack: number()
    .required('Medicine Pack is required')
    .positive()
    .integer()
    .min(1, 'Medicine Pack should be greater than 0'),

    quantity: number()
    .required('Medicine Quantity is required')
    .positive()
    .integer()
    .min(0, 'Medicine Quantity should be greater than or equal to zero'),
    
  });

=======
    header: 'Medicine Price',
    accessorKey: 'medicinePrice',
  },
];

export const MedicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

type CreateMedicinePayload = {
  medicineName: string;
  medicinePack?: number;
  medicineType?: string;
  medicinePrice?: number;
};

const requiredField = yup.string().required('This field is required');

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: requiredField,
    medicinePack: yup.number().optional().default(0),
    medicineType: yup.string().optional(),
    medicinePrice: yup.number().optional().default(0),
  });
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
