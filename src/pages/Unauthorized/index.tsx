import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import '../Layout/Layout.scss';
import Header from '../Layout/Header';
import LeftPanel from '../Layout/LeftPanel';
import RightPanel from '../Layout/RightPanel';

const Unauthorized: React.FC<PropsWithChildren> = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: '1', display: 'flex', overflow: 'hidden' }}>
        <LeftPanel />
        <Box sx={{ flexGrow: '1', overflowY: 'auto' }}>
          <RightPanel>
            <div>
              <h1>Unauthorized</h1>
              <p>You do not have permission to view this page.</p>
            </div>
          </RightPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Unauthorized;
