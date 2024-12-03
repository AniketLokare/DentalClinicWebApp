import React from 'react';
import { FcBiotech, FcBullish, FcConferenceCall, FcFilingCabinet, FcInTransit, FcPortraitMode, FcSurvey } from 'react-icons/fc';
import {
  DASHBOARD_PATH,
  MEDICINES,
  PATIENTS,
  PROCEDURES,
  SUPPLIERS,
  USERS,
} from 'src/constants/paths';

export const globalOptions = [
  {
    title: 'DASHBOARD',
    icon: <FcBullish size="24px" />,
    route: DASHBOARD_PATH, 
    tooltip: 'Dashboard', 
  },
  {
    title: 'PATIENTS',
    icon: <FcConferenceCall size="24px" />,
    route: PATIENTS,
    tooltip: 'Patients', 
  },
  {
    title: 'PROCEDURES',
    icon: <FcSurvey size="24px" />,
    route: PROCEDURES,
    tooltip: 'Procedures', 
  },
  {
    title: 'MEDICINES',
    icon: <FcBiotech size="24px" />,
    route: MEDICINES,
    tooltip: 'Medicines', 
  },
  {
    title: 'INVENTORY',
    icon: <FcFilingCabinet size="24px" />,
    options: [
      {
        title: 'SUPPLIERS',
        icon: <FcInTransit size="24px" />,
        route: SUPPLIERS,
        isSubItem: true,
        tooltip: 'Suppliers', 
      },
    ],
    tooltip: 'Inventory', 
  },
  {
    title: 'USERS',
    icon: <FcPortraitMode size="24px" />,
    route: USERS,
    tooltip: 'Users', 
  },
];
