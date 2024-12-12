import { ColumnDef } from '@tanstack/react-table';
import { PROCEDURES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

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
  procedureDate: new Date(),
  onlinePayment: 0,
  procedureDetail: '',
  procedureType: '',
  totalAmount: 0,
  cashierName: ''
};

export const procedureFormValidationSchema: ObjectSchema<CreateProcedurePayload> =
  yupObject({
    procedureDate: date().required('Required'),
    //cashPayment: number().optional().positive('Invalid amount').integer(),
    //onlinePayment: number().optional().positive('Invalid amount').integer(),
    procedureType: requiredField,
    procedureDetails: string().optional(),
    cashierName: string().optional(),
    clinicName: string().optional(),
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