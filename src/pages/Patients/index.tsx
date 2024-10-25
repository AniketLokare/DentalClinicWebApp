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
} from 'src/components';
import { listPatientsBreadcrumbLinks, patientsTableColumns } from './constants';
import { useNavigate } from 'react-router-dom';
import { NEW_PATIENT_PATH } from 'src/constants/paths';
import { useGetPatientList } from 'src/hooks/usePatients';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError } = useGetPatientList({
    apiConfig: {
      params: {
        _page: pageNumber,
        // TODO: Change this to full text search
        firstName: debouncedSearchQuery,
      },
    },
  });
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
        cell: () => {
          // const patientValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                console.log('Edit Clicked');
              }}
              onDeleteClick={() => {
                console.log('Delete Clicked');
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
      {/* <LoadingBackdrop loading={!!deleteInProgress} /> */}
      {/* <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      /> */}
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
      {/* <DeleteCredentialErrorModal
        credential={currentCredentialName}
        applications={appsForCredential}
        onClose={() => {
          setAppsForCredential([]);
        }}
      />
      <ConfirmationModal
        credential={currentCredentialName}
        onClose={() => setShowConfirmationModal(false)}
        onSubmit={() => deleteCredential(currentCredentialName)}
        open={showConfirmationModal}
      /> */}
    </>
  );
};

export default Patients;
