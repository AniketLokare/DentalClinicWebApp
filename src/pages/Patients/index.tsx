import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FiltersState, SubPanel, PageLoader, Table } from 'src/components';
import { listPatientsBreadcrumbLinks } from './constants';
import { useNavigate } from 'react-router-dom';
import { NEW_PATIENT_PATH } from 'src/constants/paths';
import TableContainer from 'src/components/Table/TableContainer';

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();

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
              {/* TODO: Change this as per the API call logic */}
              <PageLoader
                isLoading={showFilters}
                isEmpty={true}
                emptyMessage={filters?.searchQuery}
                Components={{ Loading: 'table' }}
              >
                <Table columns={[]} data={[]} />
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
