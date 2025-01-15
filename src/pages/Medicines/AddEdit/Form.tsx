import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const MedicineForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
<<<<<<< HEAD
=======
    watch,
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
  } = useFormContext<CreateMedicinePayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="medicineName"
        label="Medicine Name"
        control={control}
<<<<<<< HEAD
        placeholder="Enter medicine name"
        error={errors.medicineName?.message}
        
      />
       <FormInput
=======
        placeholder="Enter Medicine name"
        error={errors.medicineName?.message}
        trim
      />

      <FormInput
        name="medicinePack"
        label="Medicine Pack number"
        control={control}
        placeholder="Enter Medicine Pack number"
        error={errors.medicinePack?.message}
        trim
      />

      <FormInput
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
        name="medicineType"
        label="Medicine Type"
        control={control}
        placeholder="Enter Medicine Type"
        error={errors.medicineType?.message}
<<<<<<< HEAD
        
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
        name="quantity"
        label="Medicine Quantity"
        control={control}
        placeholder="Enter medicine quantity"
        error={errors.quantity?.message}
=======
        trim
      />

      <FormInput
        name="medicinePrice"
        label="Medicine Price"
        control={control}
        placeholder="Enter Medicine Price"
        error={errors.medicineType?.message}
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
        trim
      />
    </Stack>
  );
};

export default MedicineForm;
