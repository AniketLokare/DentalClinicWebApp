import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";
import { object as yupObject, ObjectSchema, number, string } from "yup";

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


export const medicinesTableColumns: ColumnDef<Medicine, string>[] = [
  {
    header: 'Medicine Name',
    accessorKey: 'medicineName',
  },
  {
    header: 'Medicine Strip',
    accessorKey: 'medicineStrip',
  },
  {
    header: 'Medicine Type',
    accessorKey: 'medicineType',
  },
  {
    header: 'medicine Quantity',
    accessorKey: 'quantity',
  },
];

export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicineType: '',
  medicineStrip: 0,
  quantity: 0,
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: string()
    .required('Medicine name is required'),

    medicineType: string()
    .required('Medicine Type is required'),

    medicineStrip: number()
    .required('Medicine Strip is required')
    .positive()
    .integer()
    .min(1, 'Medicine Strip should be greater than 0'),

    quantity: number()
    .required('Medicine Quantity is required')
    .positive()
    .integer()
    .min(0, 'Medicine Quantity should be greater than or equal to zero'),
    
  });

