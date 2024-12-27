import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const MedicineForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateMedicinePayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="medName"
        label="medName"
        control={control}
        placeholder="Enter Medicine Name"
        error={errors.medName?.message}
        trim
      />
      <FormInput
        type="number"
        name="medicinePack"
        label="medicinePack"
        control={control}
        placeholder="Enter Medicine Pack"
        error={errors.medicinePack?.message}
        trim
      />
     <FormInput
        name="medicineType"
        label="medicineType"
        control={control}
        placeholder="Enter Medicine Type"
        error={errors.medicineType?.message}
        trim
      />
      <FormInput
      type="number"
        name="medicinePrice"
        label="medicinePrice"
        control={control}
        placeholder="Enter Medicine Price"
        error={errors.medicinePrice?.message}
        trim
      />
    </Stack>
  );
};

export default MedicineForm;
