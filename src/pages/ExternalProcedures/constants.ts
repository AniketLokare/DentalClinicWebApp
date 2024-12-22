import { ColumnDef } from '@tanstack/react-table';
import { EXTERNAL_PROCEDURE } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
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

export const ExternalProceduresTableColumns: ColumnDef<ExternalProcedure, string>[] = [
  {
    header: 'Doctor Name',
    accessorKey: 'doctorName',
  },
  {
    header: 'Procedure Type',
    accessorKey: 'procedureType',
  },
  {
    header: 'Cashier Name',
    accessorKey: 'cashierName',
  },
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
  },
];

export const externalProcedureDefaultFormValues: CreateExternalProcedurePayload = {
  doctorName: '',
  feesCharged: 0,
  discount: 0,
  finalAmount: 0,
  procedureDate: '',
  procedureDetail: '',
  procedureType: '',
  cashierName: ''
};

export const externalProcedureFormValidationSchema: ObjectSchema<CreateExternalProcedurePayload> =
  yupObject({
    procedureDate: string().default('').optional(),
    procedureType: requiredField,
    procedureDetail: requiredField,
    cashierName: string().optional(),
    finalAmount: number()
      .typeError('Required')
      .required('Required')
      .integer(),
    discount: number()
      .optional()
      .positive('Invalid amount')
      .integer(),
    feesCharged: number()
      .typeError('Required')
      .required('Required')
      .integer(),
    doctorName: requiredField,
  });

