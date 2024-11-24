import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Actions,
  Snackbar,
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { listMedicinesBreadcrumbLinks, medicinesTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditMedicineRoute,
  getEditProcedureRoute,
  getViewMedicinePath,
  MEDICINES,
  NEW_MEDICINE_PATH,
} from 'src/constants/paths';
import { useDeleteMedicine, useGetMedicinesList, useDeleteConfirmationModalm } from 'src/hooks/useMedicines';
import { usePagination } from 'src/hooks/usePagination';
import { useDelete } from 'src/hooks/useDelete'
import {useMedicines } from 'src/hooks/useMedicines';
//import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
//import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetMedicinesList({
    apiConfig: {
      params: {
        _page: pageNumber,
        firstName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
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
  } = useDeleteConfirmationModalm ({ onDelete: deleteMedicine });

  const noData = !response?.data?.length;

  const medicinesTableColumnsWithActions = useMemo(
    () => [
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const medicineValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                navigate(getEditMedicineRoute(medicineValues.id));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModalm(
                  medicineValues.id, medicineValues.username
                );
              }}
              onViewDetails={() => {
                navigate(getViewMedicinePath(medicineValues.id));
              }}
            />
          );
        },
      },
    ],
    [navigate],
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
          rightSideButtonText="New Medicine"
          rightSideButtonClickEvent={() => navigate(NEW_MEDICINE_PATH)}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
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
                  columns={medicinesTableColumnsWithActions}
                  data={response?.data}
                  totalRecords={response?.items}
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
        open={showDeleteConfirmationModalm}
      />
    </>
  );
};

export default Medicines;