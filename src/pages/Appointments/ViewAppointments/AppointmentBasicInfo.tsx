import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


import {
    
    InfoField,
    
    
   
} from 'src/components';
import { formatDate } from 'src/util/common';

interface AppointmentBasicInfoProps {
    appointmentsDetails?: Appointment;
}

const AppointmentBasicInfo: React.FC<AppointmentBasicInfoProps> = ({
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
                </Box>
            </Stack>
            </Stack>
    );
};

export default AppointmentBasicInfo;