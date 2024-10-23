import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FiltersState, SubPanel, PageLoader, Table } from 'src/components';
import { listPatientsBreadcrumbLinks } from './constants';
import { useNavigate } from 'react-router-dom';
import { NEW_PATIENT_PATH } from 'src/constants/paths';
import TableContainer from 'src/components/Table/TableContainer';
import { useGetPatientList } from 'src/hooks/usePatients';

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();

  const { data, isFetching, isError } = useGetPatientList();
  const noData = !data?.length;

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
          rightSideButtonText="New Credential"
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
                emptyMessage={filters?.searchQuery} // TODO: Change this as per filter logic
                Components={{ Loading: 'table' }}
              >
                <Table columns={[]} data={data || []} />
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
