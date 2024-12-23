import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';

const ProcedureForm: React.FC = (): JSX.Element => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProcedurePayload>();

  //const procedurePayment = watch('procedurePayment');

  const totalAmount = watch('totalAmount');
  const discount = watch('discount');

  useEffect(() => {
    const finalAmount = totalAmount - (totalAmount * (discount / 100));
    setValue('finalAmount', finalAmount);
  }, [totalAmount, discount, setValue]);

  return (
    <Stack spacing={4.5}>
      {/* <FormInput
        name="patientName"
        label="Patient Name"
        control={control}
        error={errors.patientName?.message}
        trim
      /> */}
      <FormInput
        type="date"
        name="procedureDate"
        inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
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
      />
       <FormInput
        name="procedureDetails"
        label="Procedure Details"
        control={control}
        placeholder="Enter patient's procedure details"
        error={errors.procedureDetail?.message}
        multiline
        rows={4}
      />
      {/* <FormInput
        type="radio"
        radioButtonProps={{
          ...procedurePaymentProps,
          value: procedurePayment,
        }}
        name="procedurePayment"
        control={control}
        label="Procedure Payment"
        sx={{
          maxWidth: '556px',
          paddingRight: '21px',
        }}
      /> */}
      <FormInput
        name="clinicName"
        label="Enter External Clinic Name"
        control={control}
        placeholder="Enter external clinic name"
        error={errors.clinicName?.message}
        trim
      />
      <FormInput
        type="number"
        name="totalAmount"
        control={control}
        label="Total Amount (₹)"
        error={errors.totalAmount?.message}
      />
      <FormInput
        type="number"
        name="discount"
        control={control}
        label="Discount (%)"
        error={errors.discount?.message}
      />
      <FormInput
        type="number"
        name="finalAmount"
        control={control}
        label="Final Amount (₹)"
        error={errors.finalAmount?.message}
        disabled
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

export default ProcedureForm;
