import { ColumnDef } from '@tanstack/react-table';
import { PURCHASE_ORDERS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

// Breadcrumb Links
export const listPurchaseTransactionsBreadcrumbLinks = [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
  {
    label: isEdit ? 'Edit Purchase Transaction' : 'New Purchase Transaction',
    href: '#',
  },
];

export const viewPurchaseTransactionBreadCrumbLinks = [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
  {
    label: 'Purchase Transaction Details',
    href: '#',
  },
];

// Table Columns
export const PurchaseTransactionTableColumns: ColumnDef<purchaseTransaction, string>[] = [
  {
    header: 'Transaction ID',
    accessorKey: 'medtransactionId',
  },
  {
    header: 'Medicine Name',
    accessorKey: 'medicineName',
  },
  {
    header: 'Medicine Batch',
    accessorKey: 'medicineBatch',
  },
  {
    header: 'Expiry Date',
    accessorKey: 'expiry',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(), // Format date
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
  },
  {
    header: 'MRP',
    accessorKey: 'mrp',
    
  },
  {
    header: 'Rate',
    accessorKey: 'rate',
    
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    
  },
];

// Default Form Values
export const purchaseTransactionDefaultFormValues: CreatePuchaseTransactionPayload = {
    medicineName: '',
    medicineBatch: '',
    expiry: new Date(),
    medicinePack: 0,
    quantity: 0,
    availableQuantity: 0,
    mrp: 0,
    rate: 0,
    amount: 0,
};

// Form Validation Schema
export const purchaseTransactionFormValidationSchema: ObjectSchema<CreatePuchaseTransactionPayload> =
  yupObject({
    medicineName: requiredField,
    medicineBatch: string().required('Required'),
    expiry: date().required('Required'),
    medicinePack: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid value')
      .integer(),
    quantity: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid quantity')
      .integer(),
    availableQuantity: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid quantity')
      .integer(),
    mrp: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid value'),
    rate: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid value'),
    amount: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid value'),
  });
