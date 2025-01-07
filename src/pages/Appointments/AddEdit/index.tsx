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
import AppointmentsForm from './Form';
import {
    getAddEditBreadCrumbLinks,
    appointmentsDefaultFormValues,
    appointmentsFormValidationSchema,
} from '../constants';
import {
    useCreateAppointments,
    useGetAppointmentsDetail,
    usePatchAppointments,
} from 'src/hooks/useAppointments';
import { APPOINTMENTS } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';

const AddEditAppointments: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { id = '' } = useParams();
    const isEdit = !!id;

    const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
        useSnackbarAlert();

    const methods = useForm<CreateAppointmentsPayload>({
        defaultValues: appointmentsDefaultFormValues,
        resolver: yupResolver<CreateAppointmentsPayload>(appointmentsFormValidationSchema),
        mode: 'onBlur',
    });

    const { isFetching, data } = useGetAppointmentsDetail({
        id,
    });

    useEffect(() => {
        if (!isFetching && data) {
            reset(data);
        }
    }, [data, isFetching]);

    const { mutate: patchAppointments, isPending: isPatchLoading } = usePatchAppointments(
        id,
        {
            onSuccess: () => {
                navigate(APPOINTMENTS, {
                    state: {
                        alert: {
                            severity: 'success',
                            title: 'Appointment Updated.',
                            message: `Appointment updated successfully.`,
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

    const { mutate: createAppointments, isPending: isCreatingAppointments } =
        useCreateAppointments({
            onSuccess: () => {
                navigate(APPOINTMENTS, {
                    state: {
                        alert: {
                            severity: 'success',
                            title: 'Appointment Created.',
                            message: `Appointment created successfully.`,
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

    const onSubmit = (data: CreateAppointmentsPayload) => {
        if (isEdit) {
            patchAppointments(data);
        } else {
            createAppointments(data);
        }
    };

    const isMutating = isCreatingAppointments || isPatchLoading;

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
                        pageTitle={isEdit ? 'Edit Appointment' : 'New Appointment'}
                        breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
                        secondaryButtonText={isEdit ? 'Save Changes' : undefined}
                        secondaryButtonIcon={<FiSave />}
                        disableSecondaryButton={!isDirty}
                        secondaryButtonType="submit"
                    />

                    <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
                        <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
                            <AppointmentsForm />

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
                                        Create Appointment
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

export default AddEditAppointments;
