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
export const appointmentPaymentProps = {
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
  'aria-labelledby': 'appointment-payment',
  defaultValue: 'Cash',
};

export const appointmentDefaultFormValues : CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment: '',
  startTime: new Date(),
  appointmentDate: new Date(),
  patientmobile1: '',
  cashiername: '',
  timeStamp: new Date(),  
  appointmentId:'',
  appointmentDetails :'',
};

export const appointmentFormValidationSchema: ObjectSchema<CreateAppointmentPayload> =
  yupObject({
    firstName: string().required('Required'),
    middleName: string().required('Required'),
    lastName: string().required('Required'),
    appointmentDate: date().required('Required'),
    treatment: string().required('Required'),
    patientmobile1: string().required('Required'),
    cashiername: string().required('Required'),
    startTime: date().required('Required'),
    timeStamp: date().required('Required'),
    appointmentId:string().required('Required'),
    appointmentDetails:string().required('Required'),
  });