import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { loginDefaultFormValues, loginFormValidationSchema } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginUser } from 'src/hooks/useLogin';
import {
  Button,
  ErrorBoundary,
  FormError,
  Snackbar,
} from 'src/components';
import { Box, Container, Paper, Grid, Typography } from '@mui/material';
import LoginForm from './Form';
import { DASHBOARD_PATH } from 'src/constants/paths';
import { useNavigate } from 'react-router-dom';

import { PATIENTS } from 'src/constants/paths';
import { getAuthInfo } from 'src/util/auth'; // Assuming you have a function to get auth info


const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();

  const methods = useForm<CreateLoginPayload>({
    defaultValues: loginDefaultFormValues,
    resolver: yupResolver<CreateLoginPayload>(loginFormValidationSchema),
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const { mutate: loginUser } =
    useLoginUser({
      onSuccess: () => {
        const { role } = getAuthInfo(); // Get the user's role from auth info
        if (role === 'ADMIN' || role === 'MEDICO') {
          navigate(DASHBOARD_PATH, {
            state: {
              alert: {
                severity: 'success',
              },
            },
          });
        } else if (role === 'RECEP') {
          navigate(PATIENTS, {
            state: {
              alert: {
                severity: 'success',
              },
            },
          });
        }
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    });

  const onSubmit = (payload: CreateLoginPayload) => {
    loginUser(payload);
  };

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Container component="main" maxWidth="xs">
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3} // Increased spacing for more space between elements
              sx={{ height: '100vh' }}
            >
              <Paper
                sx={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                }}
              >
                <Typography variant="h4" sx={{ marginBottom: '24px', justifyContent: 'center', }}>
                  Login
                </Typography> {/* Used MUI Typography directly */}
                <LoginForm />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '12px 16px',
                    marginTop: '24px',  // Added more space above the button
                    borderRadius: '8px',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#3f51b5',
                    },
                  }}
                >
                  Login
                </Button>
              </Paper>
            </Grid>
          </Box>
        </FormProvider>
      </Container>
    </ErrorBoundary>
  );
};

export default Login;