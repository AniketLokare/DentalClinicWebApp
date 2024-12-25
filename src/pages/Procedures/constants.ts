import { ColumnDef } from '@tanstack/react-table';
import { PROCEDURES } from 'src/constants/paths';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

export const listProceduresBreadcrumbLinks = [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
  {
    label: isEdit ? 'Edit Procedure' : 'New Procedure',
    href: '#',
  },
];


export const viewProceduresBreadCrumbLinks = [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
  {
    label: 'Procedure Details',
    href: '#',
  },
];

export const ProceduresTableColumns: ColumnDef<Procedure, string>[] = [
  {
    header: 'Procedure Id',
    accessorKey: 'procedureId',
  },
  {
    header: 'Procedure Name',
    accessorKey: 'procedureType',
  },
  {
    header: 'Clinic Name',
    accessorKey: 'clinicName',
  },
  {
    header: 'Final Amount',
    accessorKey: 'finalAmount',
  },
];

export const procedurePaymentProps = {
  options: [
    {
      label: 'Online',
      value: 'online',
    },
    {
      label: 'Cash',
      value: 'cash',
    },
  ],
  'aria-labelledby': 'procedure-payment',
  defaultValue: 'Cash',
};

export const procedureDefaultFormValues: CreateProcedurePayload = {
  cashPayment: 0,
  clinicName: '',
  discount: 0,
  finalAmount: 0,
  procedureDate: '',
  onlinePayment: 0,
  procedureDetail: '',
  procedureType: '',
  totalAmount: 0,
  cashierName: ''
};

export const procedureFormValidationSchema: ObjectSchema<CreateProcedurePayload> =
  yupObject({
   
    //cashPayment: number().optional().positive('Invalid amount').integer(),
    //onlinePayment: number().optional().positive('Invalid amount').integer(),

    procedureDate: string()
    .required('Procedure Date is Required'),
    
    procedureType: string()
    .required('Procedure Type is required')
    .min(2, 'Procedure Type must be at least 2 characters')
    .max(100, 'Procedure Type cannot exceed 100 characters'),

    procedureDetails: string()
    .optional()
    .min(2, 'Procedure Details must be at least 2 characters')
    .max(100, 'Procedure Details cannot exceed 100 characters'),

    cashierName: string()
    .required("Cashier name is required")
    .max(50, 'Cashier name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'Cashier name can only contain alphabets and spaces'),

    clinicName: string()
    .optional()
    .max(50, 'Clinic Name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'Clinic Name can only contain alphabets and spaces'),
    
    //cashPayment: number().optional().positive('Invalid amount').integer(),
    //onlinePayment: number().optional().positive('Invalid amount').integer(),

    finalAmount: number()
      .typeError('Required')
      .required('Required')
      .integer(),
    discount: number()
      .optional()
      .positive('Invalid amount')
      .integer(),
    totalAmount: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid amount')
      .integer(),
  });