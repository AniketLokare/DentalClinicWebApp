import { ColumnDef } from '@tanstack/react-table';
import { PROCEDURES } from 'src/constants/paths';

export const listProceduresBreadcrumbLinks = [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
];

export const ProceduresTableColumns: ColumnDef<Procedure, string>[] = [
  {
    header: 'Patient Name',
    accessorKey: 'patientName',
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