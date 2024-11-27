import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ErrorBoundary,
  FormError,
  PageLoader,
  Snackbar,
  SubPanel,
  LoadingBackdrop,
} from 'src/components';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';
import MedicineForm from './Form';
import { MEDICINES } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import {
  getAddEditBreadCrumbLinks,
  medicineDefaultFormValues,
  medicineFormValidationSchema,
} from '../constant';
import { useGetMedicineDetail, usePatchMedicine } from 'src/hooks/useMedicines';

const AddEditMedicine: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateMedicinePayload>({
    defaultValues: medicineDefaultFormValues,
    resolver: yupResolver<CreateMedicinePayload>(medicineFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetMedicineDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching]);

  const { mutate: patchMedicine, isPending: isPatchLoading } = usePatchMedicine(
    id,
    {
      onSuccess: () => {
        navigate(MEDICINES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Medicine Updated.',
              message: `Medicine updated successfully.`,
            },
          },
        });
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    },
  );

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: CreateMedicinePayload) => {
    patchMedicine(data);
  };

  const isMutating = isPatchLoading;

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <LoadingBackdrop loading={isMutating} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <SubPanel
            pageTitle={'Edit Medicine'}
            breadcrumbLinks={getAddEditBreadCrumbLinks}
            secondaryButtonText={'Save Changes'}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <MedicineForm />

              <Box sx={{ marginTop: '60px' }}>
                <Button
                  variant="outlined"
                  sx={{ width: '170px', borderWidth: '2px' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Box>
            </PageLoader>
          </Box>
        </Box>
      </FormProvider>
    </ErrorBoundary>
  );
};

export default AddEditMedicine;
