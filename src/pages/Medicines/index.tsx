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
  LoadingBackdrop,
} from 'src/components';
import { listMedicinesBreadcrumbLinks, MedicinesTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditMedicineRoute,
  getViewMedicinePath,
  NEW_MEDICINE_PATH,
} from 'src/constants/paths';
import { useDeleteMedicine, useGetMedicineList } from 'src/hooks/useMedicines';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Medicines: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetMedicineList({
    apiConfig: {
      params: {
        _page: pageNumber,
        // TODO: Change this to full text search
        firstName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
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

  const noData = !response?.data?.length;

  const MedicinesTableColumnsWithActions = useMemo(
    () => [
      ...MedicinesTableColumns,
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
                onShowDeleteConfirmationModal(
                  medicineValues.id,
                  medicineValues.medName,
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
    [],
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
          rightSideButtonClickEvent={() => {
            navigate(NEW_MEDICINE_PATH);
          }}
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
                emptyMessage="No Medicines found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={MedicinesTableColumnsWithActions}
                  data={response?.data || []}
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
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

export default Medicines;

