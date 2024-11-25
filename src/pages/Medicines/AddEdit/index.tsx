import React, { useEffect, useMemo } from 'react';
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
import {
  getAddEditMedicineBreadCrumbLinks,
  medicineFormValidationSchema,
  medicineDefaultFormValues,
  CreateMedicinePayload,
} from '../constants';

import { useCreateMedicine, useGetMedicineDetail, usePatchMedicine } from 'src/hooks/useMedicines';
import { MEDICINES } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import Typography from '@mui/material/Typography'; // Import Typography

const AddEditMedicine: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();

  const defaultValues = useMemo(() => medicineDefaultFormValues, []);
  const methods = useForm<CreateMedicinePayload>({
    defaultValues,
    resolver: yupResolver<CreateMedicinePayload>(medicineFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data, error } = useGetMedicineDetail({ id });

  useEffect(() => {
    if (error) {
      navigate(MEDICINES, {
        state: {
          alert: {
            severity: 'error',
            title: 'Error Fetching Medicine',
            message: 'Failed to load medicine details.',
          },
        },
      });
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!isFetching && data) {
      methods.reset(data); // Reset form with fetched data
    }
  }, [data, isFetching, methods]);

  const { mutate: patchMedicine, isPending: isPatchLoading } = usePatchMedicine(id, {
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
  });

  const { mutate: createMedicine, isPending: isCreatingMedicine } = useCreateMedicine({
    onSuccess: () => {
      navigate(MEDICINES, {
        state: {
          alert: {
            severity: 'success',
            title: 'Medicine Created.',
            message: `Medicine created successfully.`,
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
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: CreateMedicinePayload) => {
    if (isEdit) {
      patchMedicine(data);
    } else {
      createMedicine(data);
    }
  };

  const isMutating = isCreatingMedicine || isPatchLoading;

  const handleCloseSnackbar = () => {
    setSnackbarAlertState({ severity: 'error', title: '', message: '' });
    onDismiss();
  };

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <LoadingBackdrop loading={isMutating} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={handleCloseSnackbar}
      />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <SubPanel
            pageTitle={isEdit ? 'Edit Medicine' : 'New Medicine'}
            breadcrumbLinks={getAddEditMedicineBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty || isMutating}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader
              isLoading={isFetching || isMutating}
              Components={{
                Loading: (
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {isFetching ? 'Loading form...' : 'Saving changes...'}
                  </Typography>
                ),
              }}
            >
              <MedicineForm />

              <Box sx={{ marginTop: '60px' }}>
                <Button
                  variant="outlined"
                  sx={{ width: '170px', borderWidth: '2px' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                {!isEdit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: 'fit-content', marginLeft: '20px' }}
                  >
                    Create Medicine
                  </Button>
                )}
              </Box>
            </PageLoader>
          </Box>
        </Box>
      </FormProvider>
    </ErrorBoundary>
  );
};

export default AddEditMedicine;