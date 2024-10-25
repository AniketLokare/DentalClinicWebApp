import { ColumnDef } from '@tanstack/react-table';
import { PATIENTS } from 'src/constants/paths';

export const listPatientsBreadcrumbLinks = [
  {
    label: 'Patients',
    href: PATIENTS,
  },
];

export const patientsTableColumns: ColumnDef<Patient, string>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'patientAge',
  },
  {
    header: 'Gender',
    accessorKey: 'patientGender',
  },
  {
    header: 'Contact Number',
    accessorKey: 'patientMobile1',
  },
];
