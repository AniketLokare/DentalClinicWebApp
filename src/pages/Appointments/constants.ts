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
        label: isEdit ? 'Edit Appointments' : 'New Appointments',
        href: '#',
    },
];

export const viewAppointmentsBreadCrumbLinks = [
    {
        label: 'Appointments',
        href: APPOINTMENTS,
    },
    {
        label: 'Appointments Details',
        href: '#',
    },
];

export const appointmentsTableColumns: ColumnDef<Appointments, string>[] = [
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
        header: 'Date',
        accessorKey: 'startTime',
    },
    {
        header: 'Contact Number',
        accessorKey: 'patientMobile1',
    },
    {
        header: 'Cashier Name',
        accessorKey: 'cashierName',
    },
];

export const appointmentsDefaultFormValues: CreateAppointmentsPayload = {
    firstName: '',
    middleName: '',
    lastName: '',
    treatment: '',
    startTime: new Date(),
    appointmentDate: new Date(),
    patientMobile1: '',
    cashierName: '',
};

export const appointmentsFormValidationSchema: ObjectSchema<CreateAppointmentsPayload> =
    yupObject({
        firstName: requiredField,
        middleName: requiredField,
        lastName: requiredField,
        treatment: requiredField,
        startTime: date().required('Required'),
        appointmentDate: date().required('Required'),
        patientMobile1: string().required('Required'),
        cashierName: requiredField,
    });
