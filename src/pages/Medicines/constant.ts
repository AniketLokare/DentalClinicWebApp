import { ColumnDef } from '@tanstack/react-table';
import { MEDICINES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: isEdit ? 'Edit Medicine' : 'New Medicine',
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

export const MedicinesTableColumns: ColumnDef<Medicine, string>[] = [
  {
    header: 'Medicine Name',
    accessorKey: 'medName',
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
  medName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medName: requiredField,
    medicinePack: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid Pack')
      .integer(),
    medicineType: string().required('Required'),
    medicinePrice: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid Price')
      .integer(),
  });
