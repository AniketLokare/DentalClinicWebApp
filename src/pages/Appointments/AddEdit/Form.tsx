import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const AppointmentForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateAppointmentPayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
      name="firstName"
      label="First Name"
      control={control}
      placeholder="Enter patient's first name"
      error={errors.firstName?.message}
      trim
      />
      <FormInput
      name="middleName"
      label="Middle Name"
      control={control}
      placeholder="Enter patient's middle name"
      error={errors.middleName?.message}
      trim
      />
      <FormInput
      name="lastName"
      label="Last Name"
      control={control}
      placeholder="Enter patient's last name"
      error={errors.lastName?.message}
      trim
      />
      <FormInput
      name="treatment"
      label="Patient Treatment"
      control={control}
      placeholder="Enter patient's treatment"
      error={errors.treatment?.message}
      trim
      multiline
      rows={3}
      />
      {/* <FormInput
      type="date"
      name="appointmentDate"
      inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
      control={control}
      label="Appointment Date"
      error={errors.appointmentDate?.message}
      sx={{ marginTop: '27px' }}
      /> */}
      <FormInput
      name="patientMobile1"
      label="Patient's Contact Number"
      control={control}
      placeholder="Enter patient's contact number"
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
    </Stack>
  );
};

export default AppointmentForm;
