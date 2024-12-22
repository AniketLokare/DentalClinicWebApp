import { ColumnDef } from "@tanstack/react-table";
import { APPOINTMENTS } from "src/constants/paths";
import { object as yupObject, ObjectSchema, number, string } from "yup";

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

export const appointmentsTableColumns: ColumnDef<Appointments, string>[] = [
  {
    header: 'Appointment Id',
    accessorKey: 'appointmentId',
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Appointment Date',
    accessorKey: 'appointmentDate',
  }
];

export const appointmentDefaultFormValues: CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment: '',
  appointmentDate: '',
  patientmobile1: 0,
  cashiername: '',
};

export const appointmentDefaultFormValidateSchema: ObjectSchema<CreateAppointmentPayload> =
  yupObject({
    firstName: string().required('First name is required'),
    middleName: string().optional(),
    lastName: string().required('Last Name is required'),
    treatment: string().required('Treatment is required'),
    appointmentDate: string().optional(),
    patientmobile1: number()
      .required('Patient Mobile Number is required')
      .positive()
      .integer()
      .test('len', 'Patient Mobile Number must be exactly 10 digits', val => val?.toString().length === 10),
    cashiername: string().optional(),
  });