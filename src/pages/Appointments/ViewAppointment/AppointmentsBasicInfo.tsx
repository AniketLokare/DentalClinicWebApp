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

interface AppointmentsBasicInfoProps {
    appointmentsDetails?: Appointments;
}

const AppointmentsBasicInfo: React.FC<AppointmentsBasicInfoProps> = ({
    appointmentsDetails,
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
                        value={appointmentsDetails?.firstName}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Middle Name"
                        value={appointmentsDetails?.middleName}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Last Name"
                        value={appointmentsDetails?.lastName}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Treatment"
                        value={`${appointmentsDetails?.treatment}`}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Start Time"
                        value={appointmentsDetails?.startTime ? formatDate(appointmentsDetails.startTime) : undefined}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Appointment Date"
                        value={formatDate(appointmentsDetails?.appointmentDate || new Date())}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Contact Number"
                        value={appointmentsDetails?.patientMobile1}
                        flexBasis="50%"
                    />
                    <InfoField
                        label="Cashier Name"
                        value={appointmentsDetails?.cashierName}
                        flexBasis="50%"
                    />
                </Box>
            </Stack>
            <Box>
                <Typography
                    variant="appBlack"
                    sx={{ fontSize: '15px', fontWeight: 700 }}
                >
                    Appointments Procedures
                </Typography>
                <Box sx={{ marginTop: '13px' }}>
                    <ErrorBoundary fallbackComponent={TableError}>
                        <PageLoader
                            isLoading={false}
                            Components={{ Loading: 'table' }}
                            isEmpty={true}
                            emptyMessage="No Appointments"
                        >
                            {/** TODO: Implement patient procedures table */}
                            <Table data={[]} columns={[]} enableRowSelection={false} />
                        </PageLoader>
                    </ErrorBoundary>
                </Box>
            </Box>
        </Stack>
    );
};

export default AppointmentsBasicInfo;
