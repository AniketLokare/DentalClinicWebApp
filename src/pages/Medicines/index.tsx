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
import { useDeleteMedicines, useGetMedicinesList } from 'src/hooks/useMedicines';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/util/common';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditMedicineRoute, getViewMedicinePath } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Medicine: React.FC = (): JSX.Element => {
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
        medicineName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicines({
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

  const medicinesTableColumnsWithActions = useMemo(
    () => [
      ...medicinesTableColumns,
      {
        header: 'Medicine Id',
        accessorKey: 'medicineId',
        cell: ({ getValue }) => (
          <Box className="text-slate-gray">{getValue()}</Box>
        ),
      },
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
                  medicineValues.medicineName,
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
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="MEDICINES"
          breadcrumbLinks={listMedicinesBreadcrumbLinks}
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
                emptyMessage="No medicine found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={medicinesTableColumnsWithActions}
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

export default Medicine;