import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';

const ExternalProcedureForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateExternalProcedurePayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="doctorName"
        label="External Doctor Name"
        control={control}
        error={errors.doctorName?.message}
        trim
      />
      <FormInput
        type="date"
        name="procedureDate"
        inputProps={{ min: format(new Date(), 'dd-mm-yyyy') }}
        control={control}
        label="Registration Date"
        error={errors.procedureDate?.message}
      />
      <FormInput
        name="procedureType"
        label="Procedure Type"
        control={control}
        placeholder="Enter patient's procedure type"
        error={errors.procedureType?.message}
        trim
      />
       <FormInput
        name="procedureDetail"
        label="Procedure Details"
        control={control}
        placeholder="Enter patient's procedure details"
        error={errors.procedureDetail?.message}
        multiline
        rows={4}
      />
      <FormInput
        type="number"
        name="feesCharged"
        control={control}
        label="Fees Charged"
        error={errors.feesCharged?.message}
      />
      <FormInput
        type="number"
        name="discount"
        control={control}
        label="Discount"
        error={errors.discount?.message}
      />
      <FormInput
        type="number"
        name="finalAmount"
        control={control}
        label="Final Amount"
        error={errors.finalAmount?.message}
      />
     <FormInput
        name="cashierName"
        label="Enter cashier Name"
        control={control}
        placeholder="Enter external clinic name"
        error={errors.cashierName?.message}
        trim
      />
    </Stack>
  );
};

export default ExternalProcedureForm;
