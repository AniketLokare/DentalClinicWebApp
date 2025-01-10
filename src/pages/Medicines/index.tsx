import React, { useState } from 'react';
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
import { listMedicinesBreadcrumbLinks, medicinesTableColumns } from './constant';

const Medicines: React.FC = (): React.ReactElement => {
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss } =
    useSnackbarAlert();

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

  // const usersTableColumnsWithActions = useMemo(
  //   () => [
  //     {
  //       id: 'avatar',
  //       cell: () => {
  //         return (
  //           <FiUser size="20px" />
  //         );
  //       },
  //     },
  //     ...usersTableColumns,
  //     {
  //       id: 'actions',
  //       cell: ({ row }) => {
  //         const userValues = row.original;

<<<<<<< Updated upstream
  //         return (
  //           <Actions
  //             onEditClick={() => {
  //               navigate(getEditUserRoute(userValues.id));
  //             }}
  //             onDeleteClick={() => {
  //               onShowDeleteConfirmationModal(
  //                 userValues.id,
  //                 userValues.username,
  //               );
  //             }}
  //           />
  //         );
  //       },
  //     },
  //   ],
  //   [],
  // );
=======
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
            />
          );
        },
      },
    ],
    [],
  );
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                  columns={medicinesTableColumns}
                  data={response?.data}
=======
                  columns={medicinesTableColumnsWithActions}
                  data={response?.data || []}
>>>>>>> Stashed changes
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
