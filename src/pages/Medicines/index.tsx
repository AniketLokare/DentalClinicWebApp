import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Snackbar,
  Actions,
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
<<<<<<< HEAD
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteMedicine, useGetMedicinesList } from 'src/hooks/useMedicines';
import {
  listMedicinesBreadcrumbLinks,
  medicinesTableColumns,
} from './constants';
import { getEditMedicineRoute, NEW_MEDICINE_PATH } from 'src/constants/paths';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { FaTablets } from 'react-icons/fa';

=======
import {
  useDeleteMedicine,
  useGetMedicinesList
} from 'src/hooks/useMedicines';
import useDeleteConfirmationModalm from 'src/hooks/useMedicines';
import { FiUser } from 'react-icons/fi';
import {
  getEditMedicineRoute,
  getEditPatientRoute,
  getEditProcedureRoute,
  getViewMedicinePath,
  NEW_MEDICINE_PATH,
} from 'src/constants/paths';
import {
  medicinesTableColumns,
  listMedicinesBreadcrumbLinks,
} from './constants';
import { useNavigate } from 'react-router-dom';
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9

const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

<<<<<<< HEAD
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
=======
  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
    useSnackbarAlert();
  
  const { pageNumber, changePageNumber } = usePagination();
<<<<<<< HEAD
=======

>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
  const { response, isFetching, isError, refetch } = useGetMedicinesList({
    apiConfig: {
      params: {
        _page: pageNumber,
<<<<<<< HEAD
        medicineName: debouncedSearchQuery,
=======
        firstName: debouncedSearchQuery,  // Adjust this key to match your API parameter
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
        ...filters,
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
<<<<<<< HEAD
          title: 'Medicine Deleted.',
          message: `Medicine "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
        });

        refetch();
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

  const noData = !response?.content?.length;

  const medicinesTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'Box',
        cell: () => {
          return <Icon component={FaTablets} size="20px" />;
        },
      },
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const medicineValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditMedicineRoute(medicineValues.medicineId));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  medicineValues.medicineId,
                  medicineValues.medicineName,
                );
              }}
=======
          title: 'Medicine Deleted',
          message: `Medicine "${deleteConfirmationModalValuesm?.name}" deleted successfully.`,
        });
        refetch();
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
          message: err.message,
        });
      },
    });

  const {
    deleteConfirmationModalValuesm,
    onDeleteConfirm,
    showDeleteConfirmationModalm,
    onShowDeleteConfirmationModalm,
    onClose,
  } = useDeleteConfirmationModalm({ onDelete: deleteMedicine });

  const noData = !response?.data?.length;

  const usersTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'avatar',
        cell: () => <FiUser size="20px" />,
      },
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const medicineValues = row.original;

          return (
            <Actions
          
              onEditClick={() =>
                navigate(getEditMedicineRoute(medicineValues.id))
              }
              onDeleteClick={() =>
                onShowDeleteConfirmationModalm(
                  medicineValues.id,
                  medicineValues.username
                )
              }
              onViewDetails={() =>
                navigate(getViewMedicinePath(medicineValues.id))
              }
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
            />
          );
        },
      },
    ],
<<<<<<< HEAD
    [],
=======
    [navigate],
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
  );

  return (
    <>
      <LoadingBackdrop loading={!!isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="MEDICINES"
          breadcrumbLinks={listMedicinesBreadcrumbLinks}
<<<<<<< HEAD
          rightSideButtonText="Add Medicine"
          rightSideButtonClickEvent={() => {
            navigate(NEW_MEDICINE_PATH);
          }}
=======
          rightSideButtonText="New Medicine"
          rightSideButtonClickEvent={() => navigate(NEW_MEDICINE_PATH)}
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
        />
        <TableContainer
          onFiltersChange={(filters) => setFilters(filters)}
          placeholder="Search By Medicine Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader 
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No medicines found"
                Components={{ Loading: 'table' }}
              >
                <Table
<<<<<<< HEAD
                  columns={medicinesTableColumnsWithActions}
                  data={response?.content || []}
                  totalRecords={response?.items}
=======
                  columns={usersTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items || 0}
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
<<<<<<< HEAD
        open={showDeleteConfirmationModal}
=======
        open={showDeleteConfirmationModalm}
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
      />
    </>
  );
};

export default Medicines;
