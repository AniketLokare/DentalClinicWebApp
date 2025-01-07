import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";
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

export const viewMedicinesBreadCrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: 'Medicine Details',
    href: '#',
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
    header: 'Medicine Price',
    accessorKey: 'medicinePrice',
  },
];

export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicineType: '',
  medicinePack: 0,
  medicinePrice: 0,
  
};

type CreateMedicinePayload = {
  medicineName: string;
  medicinePack?: number;
  medicineType?: string;
  medicinePrice?: number;
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: requiredField,
    medicineType: requiredField,
    medicinePack: string().optional(),
    medicinePrice: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid amount')
      .integer(),
  });



