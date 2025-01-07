import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { treatmentOptions } from '../constants'; // Assuming a constant for treatment options

const AppointmentForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateAppointmentPayload>();

  const appointmentDate = watch('appointmentDate');

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
        label="Treatment"
        control={control}
        placeholder="Enter treatment"
        error={errors.treatment?.message}
        trim
      />
      <FormInput
        type="date"
        name="appointmentDate"
        inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
        control={control}
        label="Appointment Date"
        error={errors.appointmentDate?.message}
        sx={{ marginTop: '27px' }}
      />
      <FormInput
        type="time"
        name="startTime"
        control={control}
        label="Start Time"
        error={errors.startTime?.message}
      />
      <FormInput
        name="patientMobile1"
        label="Contact Number"
        control={control}
        placeholder="Enter patient's contact number"
        error={errors.patientMobile1?.message}
        trim
      />
      
      <FormInput
        name="cashierName"
        label="Cashier Name"
        control={control}
        placeholder="Enter cashier's name"
        error={errors.cashierName?.message}
        trim
      />
    </Stack>
  );
};

export default AppointmentForm;
