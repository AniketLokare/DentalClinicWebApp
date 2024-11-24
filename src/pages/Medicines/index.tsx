import React, { useMemo, useState } from 'react';
import {Actions} from 'src/components';
import { useNavigate } from 'react-router-dom';
import { getEditProcedureRoute, getEditMedicineRoute, NEW_MEDICINE_PATH } from 'src/constants/paths';
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
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useGetMedicinesList } from 'src/hooks/useMedicines';
import { listMedicinesBreadcrumbLinks, medicinesTableColumns } from './constants';
import { getViewMedicinePath } from 'src/constants/paths';
const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState | undefined>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss } = useSnackbarAlert();
  const { onShowDeleteConfirmationModal } = useDeleteConfirmationModal({ 
    onDelete: (id: string) => {
    console.log(`Delete item with ID: ${id}`);
  },});

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError } = useGetMedicinesList({
    apiConfig: {
      params: {
        _page: pageNumber,
        firstName: debouncedSearchQuery,
      },
    },
  });

  const noData = !response?.data?.length;

  const medicineTableColumns = useMemo(
    () => [
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }: {row:{original:Medicine}}) => {
          const medicineValues = row.original;

          return (
            <Actions
              onAddClick={() => navigate(getEditProcedureRoute(medicineValues.id))}
              onEditClick={() => navigate(getEditMedicineRoute(medicineValues.id))}
              onDeleteClick={() =>
                onShowDeleteConfirmationModal(
                  medicineValues.id,
                  medicineValues.medicineName
                )
              }
              onViewDetails={() => {
               
                navigate(getViewMedicinePath(medicineValues.id));
              }}
            />
          );
        },
      },
    ],
    [navigate, onShowDeleteConfirmationModal]
  );

  return (
    <>
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
                emptyMessage="No medicines found"
                Components={{ Loading: 'table' }}
              >
                <Table<Medicine>
                  columns={medicineTableColumns}
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
    </>
  );
};

export default Medicines;
