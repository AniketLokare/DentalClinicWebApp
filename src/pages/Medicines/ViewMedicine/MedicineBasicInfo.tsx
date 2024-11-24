import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { InfoField } from 'src/components';

interface Medicine {
  name?: string;
  pack?: string;
  type?: string;
  price?: string;
}

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
            label="Medicine name"
            value={medicineDetails?.name || "Not available"}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine pack"
            value={medicineDetails?.pack || "Not available"}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine type"
            value={medicineDetails?.type || "Not available"}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine price"
            value={medicineDetails?.price || "Not available"}
            flexBasis="50%"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MedicineBasicInfo;
