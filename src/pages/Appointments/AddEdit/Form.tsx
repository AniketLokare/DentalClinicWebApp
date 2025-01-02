import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';

const AppointmentForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateAppointmentPayload>();


  return (
    <Stack spacing={4.5}>
      <FormInput
        name="firstName"
        label="First Name"
        control={control}
        placeholder="Enter first name of patient"
        error={errors.firstName?.message}
        trim
      />
      <FormInput
        name="middleName"
        label="Middle Name"
        control={control}
        placeholder="Enter middle name of patient"
        error={errors.middleName?.message}
        trim
      />
      <FormInput
        name="lastName"
        label="Last Name"
        control={control}
        placeholder="Enter last name of patient"
        error={errors.lastName?.message}
        trim
      />
      <FormInput
        name="treatment"
        label="Treatment Details"
        control={control}
        placeholder="Enter treatment details"
        error={errors.treatment?.message}
        trim
      />
      <FormInput
        type="time"
        name="startTime"
        control={control}
        label="Start Time"
        error={errors.appointmentDate?.message}
        sx={{ marginTop: '27px' }}
      />
      <FormInput
        type="date"
        name="appointmentDate"
        inputProps={{ min: format(new Date(), 'dd-mm-yyyy') }}
        control={control}
        label="Appointment Date"
        error={errors.appointmentDate?.message}
        sx={{ marginTop: '27px' }}
      />
      <FormInput
        name="patientmobile1"
        label="Contact Number"
        control={control}
        placeholder="Enter contact number of patient"
        error={errors.patientmobile1?.message}
        trim
      />
      <FormInput
        name="cashiername"
        label="Cashier Name"
        control={control}
        placeholder="Enter cashier's name"
        error={errors.cashiername?.message}
        trim
      />
      <FormInput
        type="time"
        name="timeStamp"
        control={control}
        label="Timestamp"
        error={errors.appointmentDate?.message}
        sx={{ marginTop: '27px' }}
      />
    </Stack>
  );
};

export default AppointmentForm;
