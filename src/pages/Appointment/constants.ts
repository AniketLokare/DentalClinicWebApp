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
    label: 'Appointment',
    href: APPOINTMENTS,
  },
  {
    label: 'Appointment Details',
    href: '#',
  },
];

 export const AppointmentTableColumns: ColumnDef<Appointment, string>[] = [
   {
     header: 'First Name',
     accessorKey: 'firstName',
   },
   {
     header: 'Middle Name',
     accessorKey: 'middleName',
   },
   {
     header: 'Last Name',
     accessorKey: 'lastName',
   },
   {
     header: 'treatment',
     accessorKey: 'treatment',
   },
   {
     header: 'Date',
     accessorKey: 'startTime',
   },
   {
     header: 'Appointment Date',
     accessorKey: 'appointmentDate',
   },
   {
     header: 'Contact Number',
     accessorKey: 'patientmobile1',
   },
   {
     header: 'Cashier Name',
     accessorKey: 'cashierName',
   },
   {
     header: 'Timestamp',
     accessorKey: 'timestamp',
   },
 ]; 

export const appointmentDefaultFormValues: CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment: '',
  startTime: new Date(),
  appointmentDate: new Date(),
  patientmobile1: ' ',
  cashierName: '',
  timestamp: new Date(),
};

export const appointmentFormValidationSchema: ObjectSchema<CreateAppointmentPayload> =
  yupObject({
    firstName: requiredField,
    lastName: requiredField,
    treatment: string().required(),
    startTime: date().optional(),
    appointmentDate: requiredField,
    middleName: string().optional(),
    patientmobile1: requiredField,
    cashierName: string().required(),
    timestamp: date().optional(),
  });
