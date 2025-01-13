import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { getAuthInfo } from 'src/util/auth';
import { Controller, useFormContext,useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { Grid } from '@mui/material';

const AppointmentForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
    
    setValue, 
  } = useFormContext<CreateAppointmentPayload>();


  
     const { username } = getAuthInfo(); 
    // Set cashierName using useEffect
    useEffect(() => {
      if (username && typeof username === 'string') {
        setValue('cashiername', username.trim()); // Ensure no quotes or spaces
      }
    }, [username, setValue]);

  return (
    <Stack spacing={4.5}>
      {/* First Row: First Name, Middle Name, Last Name */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormInput
            name="firstName"
            label="First Name"
            control={control}
            placeholder="Enter patient's first name"
            error={errors.firstName?.message}
            trim
            
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            name="middleName"
            label="Middle Name"
            control={control}
            placeholder="Enter patient's middle name"
            error={errors.middleName?.message}
            trim
           
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            name="lastName"
            label="Last Name"
            control={control}
            placeholder="Enter patient's last name"
            error={errors.lastName?.message}
            trim
            
          />
        </Grid>
      </Grid>

      {/* Second Row: Patient Treatment */}
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInput
          name="treatment"
          label="Patient Treatment"
          control={control}
          placeholder="Enter patient's treatment"
          error={errors.treatment?.message}
          multiline
          rows={3}
          
        />
      </Grid>
      </Grid>

      {/* Third Row: Appointment Date and Start Time */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormInput
            type="date"
            name="appointmentDate"
            
            control={control}
            label="Appointment Date"
            error={errors.appointmentDate?.message}
           
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            type="time"
            name="startTime"
            control={control}
            label="Start Time"
            error={errors.startTime?.message}
            
          />
        </Grid>
      </Grid>

      {/* Fourth Row: Patient Contact Number and Cashier Name */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormInput
            name="patientmobile1"
            label="Patient's Contact Number"
            control={control}
            placeholder="Enter patient's contact number"
            error={errors.patientmobile1?.message}
            trim
           
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ visibility: 'hidden' }}>
          <Controller
            name="cashiername"
            defaultValue="" // Leave default value empty as it will be set in useEffect
            render={({ field }) => (
              <FormInput
                {...field}
                control={control}
                label="Cashier Name"
                placeholder="Enter cashier's name"
                error={errors.cashiername?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AppointmentForm;
