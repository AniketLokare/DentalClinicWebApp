import React from 'react';
import {
  Button,
  ErrorBoundary,
  FormError,
  Icon,
  PageLoader,
  Snackbar,
  SubPanel,
  LoadingBackdrop,
} from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteMedicine, useGetMedicineDetail } from 'src/hooks/useMedicines';
import { getEditMedicineRoute, MEDICINES } from 'src/constants/paths';
import MedicineBasicInfo from './MedicineBasicInfo';
import { ERROR_RED } from 'src/constants/colors';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { listMedicinesBreadcrumbLinks } from '../constants';

const ViewMedicine: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isFetching, data } = useGetMedicineDetail({
    id,
  });
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const onEditMedicine = () => {
    navigate(getEditMedicineRoute(id));
  };

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        navigate(MEDICINES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Medicine Deleted.',
              message: `Medicine "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({ onDelete: deleteMedicine });

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />

      <SubPanel
        pageTitle="MEDICINE DETAILS"
        breadcrumbLinks={listMedicinesBreadcrumbLinks}
      />
      <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
        <Stack spacing={3} sx={{ marginTop: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                sx={{ fontWeight: '600', fontSize: '26px', lineHeight: '31px' }}
              >
                {data?.medicineName}
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Button
                variant="outlined"
                onClick={onEditMedicine}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(
                    data?.medicineId || '',
                    data?.medicineName || '',
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <MedicineBasicInfo medicineDetails={data} />
          <Box>
            <Button
              variant="outlined"
              startIcon={<Icon icon="arrowLeft" size="15" />}
              sx={{ padding: '20px' }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
          <ConfirmationModal
            onClose={onClose}
            onSubmit={onDeleteConfirm}
            open={showDeleteConfirmationModal}
          />
        </Stack>
      </PageLoader>
    </ErrorBoundary>
  );
};

export default ViewMedicine;
