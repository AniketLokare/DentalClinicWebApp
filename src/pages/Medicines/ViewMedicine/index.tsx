import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { InfoField, Button, Snackbar, SubPanel, LoadingBackdrop } from 'src/components';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMedicineDetail, useDeleteMedicine } from 'src/hooks/useMedicines';
import { Medicine } from 'src/api/medicine/types';  // Ensure correct import
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { ERROR_RED } from 'src/constants/colors';
import { getEditMedicineRoute, MEDICINES } from 'src/constants/paths';

const ViewMedicine: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  // Fetch medicine details using the correct 'id'
  const { isFetching, data } = useGetMedicineDetail({ id });

  // Ensure data is typed as Medicine
  const medicineData = data as Medicine;

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();

  // Edit medicine route
  const onEditMedicine = () => {
    navigate(getEditMedicineRoute(id));
  };

  // Delete medicine logic
  const { mutate: deleteMedicine, isPending: isDeleteInProgress } = useDeleteMedicine({
    onSuccess: () => {
      navigate(MEDICINES, {
        state: {
          alert: {
            severity: 'success',
            title: 'Medicine Deleted.',
            message: `Medicine "${medicineData.medicineName}" has been deleted successfully.`,
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

  // Delete confirmation modal logic
  const {
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({
    onDelete: deleteMedicine,
  });

  return (
    <div>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />

      <SubPanel
        pageTitle="MEDICINE DETAILS"
        breadcrumbLinks={[
          { label: 'Home', href: '/' },
          { label: 'Medicines', href: MEDICINES },
          { label: 'View Medicine', href: '#' },  // Use `#` for the current page or any placeholder
        ]}
      />


      <Box sx={{ marginTop: '60px' }}>
        <Stack spacing={3}>
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
              <Typography sx={{ fontWeight: '600', fontSize: '26px', lineHeight: '31px' }}>
                {medicineData?.medicineName || 'Loading...'}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <Button
                variant="outlined"
                onClick={onEditMedicine}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(medicineData?.id, medicineData?.medicineName)
                }
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>

          {/* Display Medicine Basic Information */}
          <Box sx={{ marginTop: '20px' }}>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" justifyContent="flex-start" flexWrap="wrap">
                <InfoField
                  label="Medicine Name"
                  value={medicineData?.medicineName || 'Not available'}
                  flexBasis="50%"
                />
                <InfoField
                  label="Medicine Pack"
                  value={medicineData?.medicinePack?.toString() || 'Not available'}
                  flexBasis="50%"
                />
                <InfoField
                  label="Medicine Type"
                  value={medicineData?.medicineType || 'Not available'}
                  flexBasis="50%"
                />
                <InfoField
                  label="Medicine Price"
                  value={medicineData?.medicinePrice ? `$${medicineData.medicinePrice}` : 'Not available'}
                  flexBasis="50%"
                />
              </Box>
            </Stack>
          </Box>

          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>

          {/* Confirmation Modal */}
          <ConfirmationModal
            onClose={onClose}
            onSubmit={onDeleteConfirm}
            open={showDeleteConfirmationModal}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ViewMedicine;
