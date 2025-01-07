import { ColumnDef } from '@tanstack/react-table';
import { APPOINTMENTS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, string, ObjectSchema, date } from 'yup';

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


export const viewAppointmentsBreadCrumbLinks = [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
  {
    label: 'Appointment Details',
    href: '#',
  },
];

export const AppointmentsTableColumns: ColumnDef<Appointment, string>[] = [
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
    header: 'Treatment',
    accessorKey: 'treatment',
  },
  {
    header: 'Patient Mobile',
    accessorKey: 'patientmobile1',
  },  
];

export const appointmentDefaultFormValues: CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment: '',
  startTime: new Date(),
  appointmentDate: new Date(),
  patientmobile1: '',
  cashiername: '',
  timeStamp: new Date(),  
};

export const appointmentFormValidationSchema: ObjectSchema<CreateAppointmentPayload> =
  yupObject({
    firstName: requiredField,
    middleName: requiredField,
    lastName: requiredField,
    appointmentDate: date().required('Required'),
    treatment: requiredField,
    patientmobile1: requiredField,
    cashiername: string().optional(),
    startTime: string().optional(),
    timeStamp: date().optional(),
  });

