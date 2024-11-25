import React, { useMemo, useState } from 'react';
import { Actions } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { getEditMedicineRoute, NEW_MEDICINE_PATH, getViewMedicinePath } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Snackbar,
  LoadingBackdrop,
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useGetMedicinesList, useDeleteMedicine } from 'src/hooks/useMedicines';
import { listMedicinesBreadcrumbLinks, medicinesTableColumns } from './constants';
import { Medicine } from 'src/api/medicine/types';
import { ColumnDef } from '@tanstack/react-table';

const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState | undefined>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();
  const { pageNumber, changePageNumber } = usePagination();

  const { response, isFetching, isError, refetch } = useGetMedicinesList({
    apiConfig: { params: { _page: pageNumber, firstName: debouncedSearchQuery } },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } = useDeleteMedicine({
    onSuccess: () => {
      setSnackbarAlertState({
        severity: 'success',
        title: 'Success',
        message: 'Medicine deleted successfully.',
      });
      refetch(); // Refresh table data after successful delete
    },
    onError: (err: Error) => {
      setSnackbarAlertState({
        severity: 'error',
        title: 'Error',
        message: err.message,
      });
    },
  });

  const { onShowDeleteConfirmationModal } = useDeleteConfirmationModal({
    onDelete: (id: string) => {
      deleteMedicine(id); // Call the delete hook
    },
  });

  // Memoize columns with proper types
  const medicineTableColumns: ColumnDef<Medicine, unknown>[] = useMemo(() => {
    const baseColumns: ColumnDef<Medicine, unknown>[] = medicinesTableColumns;

    const actionsColumn: ColumnDef<Medicine, unknown> = {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: Medicine } }) => {
        const medicineValues = row.original;

        return (
          <Actions
            onEditClick={() => navigate(getEditMedicineRoute(medicineValues.id))}
            onDeleteClick={() =>
              onShowDeleteConfirmationModal(medicineValues.id, medicineValues.medicineName)
            }
            onViewDetails={() => navigate(getViewMedicinePath(medicineValues.id))}
          />
        );
      },
    };

    return [...baseColumns, actionsColumn];
  }, [navigate, onShowDeleteConfirmationModal]);

  // Handle empty data state more explicitly
  const medicinesData: Medicine[] = response?.data || [];
  const noData = medicinesData.length === 0;

  return (
    <>
      {/* Snackbar for Feedback */}
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      {/* Loading Backdrop for Delete Operation */}
      <LoadingBackdrop loading={isDeleteInProgress} />

      <Stack spacing={2}>
        {/* SubPanel for Page Title and Breadcrumbs */}
        <SubPanel
          pageTitle="MEDICINES"
          breadcrumbLinks={listMedicinesBreadcrumbLinks}
          rightSideButtonText="New Medicine"
          rightSideButtonClickEvent={() => {
            navigate(NEW_MEDICINE_PATH);
          }}
        />

        {/* Table Container */}
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Medicine Name"
        >
          {({ showFilters }) => (
            <Box>
              {/* PageLoader for Loading State */}
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No medicines found"
                Components={{ Loading: 'table' }}
              >
                {/* Table Component */}
                <Table<Medicine>
                  columns={medicineTableColumns} // Use updated column definitions
                  data={medicinesData} // Ensure the data matches the Medicine type
                  totalRecords={response?.items || 0} // Make sure totalRecords is a number
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
    </>
  );
};

export default Medicines;