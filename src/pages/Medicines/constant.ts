import { ColumnDef } from '@tanstack/react-table';
import { MEDICINES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, ObjectSchema } from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];

export const getAddEditBreadCrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: 'Edit Medicine',
    href: '#',
  },
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

export const medicinesTableColumns: ColumnDef<Medicine, string>[] = [
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

export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: requiredField,
    medicinePack: number().typeError('Required').required('Required'),
    medicineType: requiredField,
    medicinePrice: number().typeError('Required').required('Required'),
  });
