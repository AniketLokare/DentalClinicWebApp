import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
  ErrorBoundary,
  InfoField,
  PageLoader,
  Table,
  TableError,
} from 'src/components';


interface MedicineBasicInfoProps {
  medicineDetails?: Medicine;
}

const MedicineBasicInfo: React.FC<MedicineBasicInfoProps> = ({
    medicineDetails,
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
            label="Medicine Name"
            value={medicineDetails?.medName}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Pack"
            value={`${medicineDetails?.medicinePack}`}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Type"
            value={medicineDetails?.medicineType}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Price"
            value={`${medicineDetails?.medicinePrice}`}
            flexBasis="50%"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MedicineBasicInfo;
