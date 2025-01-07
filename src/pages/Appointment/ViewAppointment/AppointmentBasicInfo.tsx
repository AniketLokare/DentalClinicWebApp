import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  ErrorBoundary,
  InfoField,
  PageLoader,
  Table,
  TableError,
} from 'src/components';
import { formatDate } from 'src/util/common';

interface AppointmentBasicInfoProps {
  appointmentDetails?: Appointment;
}

const AppointmentBasicInfo: React.FC<AppointmentBasicInfoProps> = ({
  appointmentDetails,
}): JSX.Element => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          rowGap="20px"
        >
          <InfoField
            label="First Name"
            value={appointmentDetails?.firstName}
            flexBasis="50%"
          />
          <InfoField
            label="Middle Name"
            value={appointmentDetails?.middleName}
            flexBasis="50%"
          />
          <InfoField
            label="Last Name"
            value={appointmentDetails?.lastName}
            flexBasis="50%"
          />
          <InfoField
            label="Treatment Details"
            value={appointmentDetails?.treatment}
            flexBasis="50%"
          />
          <InfoField
            label="Start Date"
            value={formatDate(appointmentDetails?.startTime || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Appointment Date"
            value={formatDate(
              appointmentDetails?.appointmentDate || new Date(),
            )}
            flexBasis="50%"
          />
          <InfoField
            label="Contact Number"
            value={appointmentDetails?.patientmobile1}
            flexBasis="50%"
          />
          <InfoField
            label="Cashier Name"
            value={appointmentDetails?.cashiername}
            flexBasis="50%"
          />
          <InfoField
            label="Timestamp"
            value={formatDate(appointmentDetails?.timestamp || new Date())}
            flexBasis="50%"
          />
        </Box>
      </Stack>
      <Box>
        <Typography
          variant="appBlack"
          sx={{ fontSize: '15px', fontWeight: 700 }}
        >
          Appointment Procedures
        </Typography>
        <Box sx={{ marginTop: '13px' }}>
          <ErrorBoundary fallbackComponent={TableError}>
            <PageLoader
              isLoading={false}
              Components={{ Loading: 'table' }}
              isEmpty={true}
              emptyMessage="No Appointment Procedures"
            >
              {/** TODO: Implement appointment procedures table */}
              <Table data={[]} columns={[]} enableRowSelection={false} />
            </PageLoader>
          </ErrorBoundary>
        </Box>
      </Box>
    </Stack>
  );
};

export default AppointmentBasicInfo;
