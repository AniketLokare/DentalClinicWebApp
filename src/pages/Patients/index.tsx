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
} from 'src/components';
import { listPatientsBreadcrumbLinks, patientsTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import { getEditPatientRoute, NEW_PATIENT_PATH } from 'src/constants/paths';
import { useDeletePatient, useGetPatientList } from 'src/hooks/usePatients';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import LoadingBackdrop from 'src/components/LoadingBackdrop';

export interface DeleteConfirmationModalValues {
  id: string;
  name: string;
}

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const [deleteConfirmationModalValues, setDeleteConfirmationModalValues] =
    useState<DeleteConfirmationModalValues>({ id: '', name: '' });
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetPatientList({
    apiConfig: {
      params: {
        _page: pageNumber,
        // TODO: Change this to full text search
        firstName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deletePatient, isPending: isDeleteInProgress } =
    useDeletePatient({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Patient Deleted.',
          message: `Patient "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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

  const onDeleteConfirm = () => {
    deletePatient(deleteConfirmationModalValues.id);
    setShowDeleteConfirmationModal(false);
  };

  const noData = !response?.data?.length;

  const patientsTableColumnsWithActions = useMemo(
    () => [
      ...patientsTableColumns,
      {
        header: 'Registration Date',
        accessorKey: 'patientRegDate',
        cell: ({ getValue }) => (
          <Box className="text-slate-gray">{formatDate(getValue())}</Box>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const patientValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditPatientRoute(patientValues.id));
              }}
              onDeleteClick={() => {
                setDeleteConfirmationModalValues({
                  id: patientValues.id,
                  name: patientValues.firstName,
                });
                setShowDeleteConfirmationModal(true);
              }}
              onViewDetails={() => {
                console.log('View Details Clicked');
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
          pageTitle="PATIENTS"
          breadcrumbLinks={listPatientsBreadcrumbLinks}
          rightSideButtonText="New Patient"
          rightSideButtonClickEvent={() => {
            navigate(NEW_PATIENT_PATH);
          }}
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
                emptyMessage="No patients found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={patientsTableColumnsWithActions}
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
        onClose={() => setShowDeleteConfirmationModal(false)}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

export default Patients;
