import { ColumnDef } from '@tanstack/react-table';
import { APPOINTMENTS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

export const listAppointmentsBreadcrumbLinks = [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
  {
    label: isEdit ? 'Edit Appointment' : 'New Appointment',
    href: '#',
  },
];

export const viewAppointmentBreadCrumbLinks = [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
  {
    label: 'Appointment Details',
    href: '#',
  },
];

export const appointmentsTableColumns: ColumnDef<Appointment, string>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Treatment',
    accessorKey: 'treatment',
  },
  {
    header: 'Contact Number',
    accessorKey: 'patientMobile1',
  },
];

export const appointmentDefaultFormValues: CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment:'',
  startTime: 0,
  appointmentDate: new Date(),
  patientMobile1: '',
  cashierName: '',
};

export const appointmentFormValidationSchema: ObjectSchema<CreateAppointmentPayload> = yupObject({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    treatment: string().required('Treatment is required'),
    appointmentDate: date().required('Appointment date is required'),
    middleName: string().optional(),
    patientMobile1: string().required('Patient mobile is required'),
    startTime: number().required('Start time is required'), // Validates `startTime` as a number
    cashierName: string().required('Cashier name is required'), // Ensures validation for `cashierName`
  });