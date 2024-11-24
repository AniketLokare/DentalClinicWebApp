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
//import { formatDate } from 'src/util/common';

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
            label="Type"
            value={medicineDetails?.medicineType}
            flexBasis="50%"
          />
          <InfoField
            label="Details"
            value={medicineDetails?.medicinePack}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Name"
            value={medicineDetails?.medicineName}
            flexBasis="50%"
          />
          {/* /* <InfoField
            label="Clinic Name"
            value={medicineDetails?.clinicName}
            flexBasis="50%"
          />
          <InfoField
            label="Date"
            value={formatDate(medicineDetails?.procedureDate || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Time"
            value={formatDate(medicineDetails?.procedureTime || new Date())}
            flexBasis="50%"
          /> */}
          <InfoField
            label="Medicine Price"
            value={`${medicineDetails?.medicinePrice}`}
            flexBasis="50%"
          />
          {/* <InfoField
            label="Discount"
            value={`${medicineDetails?.discount} %`}
            flexBasis="50%"
          /> */}
        </Box>
      </Stack>
      <Box>
        <Typography
          variant="appBlack"
          sx={{ fontSize: '15px', fontWeight: 700 }}
        >
          Medicine Details
        </Typography>
        <Box sx={{ marginTop: '13px' }}>
          <ErrorBoundary fallbackComponent={TableError}>
            <PageLoader
              isLoading={false}
              Components={{ Loading: 'table' }}
              isEmpty={true}
              emptyMessage="No Medicine Details"
            >
              <Table data={[]} columns={[]} enableRowSelection={false} />
            </PageLoader>
          </ErrorBoundary>
        </Box>
      </Box>
    </Stack>
  );
};

export default MedicineBasicInfo;
