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
        placeholder="Enter medicine name"
        error={errors.medicineName?.message}
        trim
      />
       <FormInput
        name="medicineType"
        label="Medicine Type"
        control={control}
        placeholder="Enter Medicine Type"
        error={errors.medicineType?.message}
        trim
      />
      <FormInput
        name="medicinePack"
        label="Medicine Pack"
        control={control}  
        placeholder="Enter medicine pack"
        error={errors.medicinePack?.message}
        trim
      />
      <FormInput
        name="medicineQuantity"
        label="Medicine Quantity"
        control={control}
        placeholder="Enter medicine quantity"
        error={errors.medicineQuantity?.message}
        trim
      />
    </Stack>
  );
};

export default MedicineForm;
