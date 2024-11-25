// src/components/MedicineBasicInfo.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { InfoField } from 'src/components';
import { Medicine } from 'src/types';  // Import the shared Medicine type

interface MedicineBasicInfoProps {
  medicineDetails?: Medicine;  // Use the Medicine type
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
          {/* Medicine Name */}
          <InfoField
            label="Medicine Name"
            value={medicineDetails?.name || 'Not available'}
            flexBasis="50%"
          />
          {/* Medicine Pack */}
          <InfoField
            label="Medicine Pack"
            value={medicineDetails?.pack?.toString() || 'Not available'} // Convert number to string
            flexBasis="50%"
          />
          {/* Medicine Type */}
          <InfoField
            label="Medicine Type"
            value={medicineDetails?.type || 'Not available'}
            flexBasis="50%"
          />
          {/* Medicine Price */}
          <InfoField
            label="Medicine Price"
            value={medicineDetails?.price !== undefined ? `$${medicineDetails.price}` : 'Not available'}
            flexBasis="50%"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MedicineBasicInfo;
