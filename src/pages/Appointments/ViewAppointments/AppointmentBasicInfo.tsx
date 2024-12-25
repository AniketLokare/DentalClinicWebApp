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
  appointmentDetails?: {
    appointmentId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    treatment: string;
    startTime: string;
    appointmentDate: string;
    patientmobile1: number;
    cashiername: string;
    timestamp: string;
  };
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
            label="Appointment ID"
            value={appointmentDetails?.appointmentId.toString()}
            flexBasis="50%"
          />
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
            label="Treatment"
            value={appointmentDetails?.treatment}
            flexBasis="50%"
          />
          <InfoField
            label="Start Time"
            value={appointmentDetails?.startTime ? formatDate(appointmentDetails.startTime) : ''}
            flexBasis="50%"
          />
          <InfoField
            label="Appointment Date"
            value={appointmentDetails?.appointmentDate}
            flexBasis="50%"
          />
          <InfoField
            label="Patient Mobile"
            value={appointmentDetails?.patientmobile1.toString()}
            flexBasis="50%"
          />
          <InfoField
            label="Cashier Name"
            value={appointmentDetails?.cashiername}
            flexBasis="50%"
          />
          <InfoField
            label="Timestamp"
            value={appointmentDetails?.timestamp ? formatDate(appointmentDetails.timestamp) : ''}
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
