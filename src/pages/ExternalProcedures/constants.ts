import { ColumnDef } from '@tanstack/react-table';
import { EXTERNAL_PROCEDURE } from 'src/constants/paths';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

export const listExternalProceduresBreadcrumbLinks = [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: isEdit ? 'Edit Procedure' : 'New Procedure',
    href: '#',
  },
];


export const viewProceduresBreadCrumbLinks = [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: 'External Procedure Details',
    href: '#',
  },
];

export const viewProcedureReportBreadCrumbLinks = [
  {
    label: 'Reports',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: 'External Procedures',
    href: '#',
  },
];

export const ExternalProceduresTableColumns: ColumnDef<ExternalProcedure, string>[] = [
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
  },
  {
    header: 'Doctor Name',
    accessorKey: 'doctorName',
  },
  {
    header: 'Procedure Type',
    accessorKey: 'procedureType',
  },

  {
    header: 'Online Payment',
    accessorKey: 'onlinePayment',
  },
  {
    header: 'Cash Payment',
    accessorKey: 'cashPayment',
  },

  

  {
    header: 'Total Amount',
    accessorKey: 'finalAmount',
  },
  {
    header: 'Cashier Name',
    accessorKey: 'cashierName',
  },
 
];


export const ExternalProceduresReportTableColumns: ColumnDef<ExternalProcedure, string>[] = [
  {
    header: 'ID',
    accessorKey: 'doctorId',
  },
  
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
  },
  {
    header: 'Doctor Name',
    accessorKey: 'doctorName',
  },
  {
    header: 'Procedure Type',
    accessorKey: 'procedureType',
  },
  
  
  {
    header: 'Online Payment',
    accessorKey: 'onlinePayment',
  },
  {
    header: 'Cash Payment',
    accessorKey: 'cashPayment',
  },

  

  {
    header: 'Total Amount',
    accessorKey: 'finalAmount',
  },
  {
    header: 'Cashier',
    accessorKey: 'cashierName',
  },

  
];

export const externalProcedurePaymentProps = {
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

export const externalProcedureDefaultFormValues: CreateExternalProcedurePayload = {
  doctorName: '',
  feesCharged: 0,
  discount: 0,
  finalAmount: 0,
  procedureDate: '',
  procedureDetail: '',
  procedureType: '',
  cashPayment: 0,
  onlinePayment: 0,
  cashierName: '',
};

export const externalProcedureFormValidationSchema: ObjectSchema<CreateExternalProcedurePayload> =
  yupObject({
    procedureDate: string()
    .required('Procedure Date is Required'),
    
    procedureType: string().required('Procedure Type is required'),

    procedureDetail: string().optional().default(''),

    cashierName: string().optional().max(50, 'Cashier name cannot exceed 50 characters'),

    finalAmount: number()
      .typeError('Required')
      .integer()
      .required(),

    discount: number()
      .optional()
      .min(0, 'Invalid amount')
      .integer()
      .default(0), // ✅ FIXED: Default to 0

    feesCharged: number()
      .typeError('Required')
      .integer()
      .default(0) // ✅ FIXED: Default to 0

      .required(),

    cashPayment: number()
      .typeError('Required')
      .integer()
      .required(),

    onlinePayment: number()
      .typeError('Required')
      .integer()
      .required(),

    doctorName: string()
      .required("Doctor name is required")
      .max(50, 'Doctor name cannot exceed 50 characters')
      .matches(/^[A-Za-z\s]*$/, 'Doctor name can only contain alphabets and spaces'),
  });

