import { ColumnDef } from '@tanstack/react-table';
import { APPOINTMENTS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema,  } from 'yup';

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
      header: 'Start Time',
      accessorKey: 'startTime',
    },
    {
      header: 'Appointment Date',
      accessorKey: 'appointmentDate',
    },
    {
      header: 'Patient Mobile',
      accessorKey: 'patientMobile1',
    },
    {
      header: 'Cashier Name',
      accessorKey: 'cashierName',
    },
    {
      header:'Timestamp',
      accessorKey:'timestamp'
    },
  ];
  
  export const appointmentDefaultFormValues: CreateAppointmentPayload = {
    appointmentId: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    treatment: '',
    startTime: '',
    appointmentDate: '',
    patientMobile1: '',
    cashierName: '',
    timestamp: '',
  };
  
  export const appointmentFormValidationSchema: ObjectSchema<CreateAppointmentPayload> =
    yupObject({
      appointmentId: number().required('Required').positive().integer(),
      firstName: requiredField,
      middleName: string().optional(),
      lastName: requiredField,
      treatment: requiredField,
      startTime: string().required('Required'), // Expecting ISO string or specific format
      appointmentDate: string().required('Required'), // Expecting ISO string or specific format
      patientMobile1: string().required('Required'),
      cashierName: requiredField,
      timestamp: string().required('Required'), // Expecting ISO string or specific format
    });
  
