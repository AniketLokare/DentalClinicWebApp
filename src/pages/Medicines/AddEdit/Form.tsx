import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const MedicineForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateMedicinePayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="medicineName"
        label="Medicine Name"
        control={control}
        placeholder="Enter the name of the medicine"
        error={errors.medicineName?.message}
        trim
      />
      <FormInput
        name="medicinePack"
        label="Medicine Pack"
        control={control}
        placeholder="Enter the medicine pack number"
        error={errors.medicinePack?.message}
        trim
      />
      <FormInput
        name="medicineType"
        label="Medicine Type"
        control={control}
        placeholder="Enter the type of medicine"
        error={errors.medicineType?.message}
        trim
      />
      <FormInput
        name="medicinePrice"
        label="Medicine Price"
        type="number"
        control={control}
        placeholder="Enter the price of the medicine"
        error={errors.medicinePrice?.message}
        trim
      />
    </Stack>
  );
};

export default MedicineForm;