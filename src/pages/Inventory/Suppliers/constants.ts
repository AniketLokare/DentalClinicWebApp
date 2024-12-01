import { ColumnDef } from "@tanstack/react-table";
import { SUPPLIERS } from "src/constants/paths";

export const listSuppliersBreadcrumbLinks = [
  {
    label: 'Suppliers',
    href: SUPPLIERS,
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