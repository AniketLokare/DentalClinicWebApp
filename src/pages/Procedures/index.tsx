import React, { useMemo, useState, useEffect } from 'react';
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
import { listProceduresBreadcrumbLinks, ProceduresTableColumns } from './constants';
import { useDeleteProcedure, useGetProceduresList } from 'src/hooks/useProcedures';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useDeletePatient, useGetPatientList } from 'src/hooks/usePatients';
import { getEditProcedureRoute, getViewProcedurePath } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Procedures: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  
  const { response, isFetching, isError, refetch } = useGetPatientList({
    apiConfig: {
      params: {
        _page: pageNumber,
        name: debouncedSearchQuery,
      },
    },
  });

  useEffect(() => {
    console.log('Response from getPatientList:', response);
  }, [response]);

  const patientsData = response?.content || [];
  const totalItems = response?.items || 0;

  const { mutate: deleteProcedure, isPending: isDeleteInProgress } = useDeleteProcedure({
    onSuccess: () => {
      setSnackbarAlertState({
        severity: 'success',
        title: 'Procedure Deleted.',
        message: `Procedure "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteProcedure });

  const noData = !patientsData.length;

  const proceduresTableColumnsWithActions = useMemo(
    () => [
      ...ProceduresTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const procedureValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                navigate(getEditProcedureRoute(procedureValues.procedureId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  procedureValues.procedureId.toString(),
                  procedureValues.procedureDetail,
                );
              }}
              onViewDetails={() => {
                navigate(getViewProcedurePath(procedureValues.procedureId.toString()));
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
          pageTitle="PROCEDURES"
          breadcrumbLinks={listProceduresBreadcrumbLinks}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Patient Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No procedures found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={proceduresTableColumnsWithActions}
                  data={patientsData}
                  totalRecords={totalItems}
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

export default Procedures;
