import { ColumnDef } from "@tanstack/react-table";
import { SUPPLIERS } from "src/constants/paths";
import { requiredField } from "src/constants/validationSchema";
import { object as yupObject, ObjectSchema } from 'yup';

export const listSuppliersBreadcrumbLinks = [
  {
    label: 'Suppliers',
    href: SUPPLIERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Suppliers',
    href: SUPPLIERS,
  },
  {
    label: isEdit ? 'Edit Supplier' : 'New Supplier',
    href: '#',
  },
];

export const suppliersTableColumns: ColumnDef<Supplier, string>[] = [
  {
    header: 'Supplier Id',
    accessorKey: 'supplierId',
  },
  {
    header: 'Supplier Name',
    accessorKey: 'supplierName',
  },
  {
    header: 'Supplier Address',
    accessorKey: 'supplierAddress',
  },
  {
    header: 'Supplier Phone',
    accessorKey: 'supplierMobile',
  },
];

export const supplierDefaultFormValues: CreateSupplierPayload = {
  supplierName: '',
  supplierAddress: '',
  supplierPhone: '',
};

export const supplierFormValidationSchema: ObjectSchema<CreateSupplierPayload> = yupObject({
  supplierName: requiredField,
  supplierAddress: requiredField,
  supplierPhone: requiredField,
});