import React from 'react';
import { FaCartPlus, FaProcedures, FaTruck } from 'react-icons/fa';
import { FcBullish, FcCalendar, FcConferenceCall, FcFilingCabinet, FcPortraitMode } from 'react-icons/fc';
import { MdBarChart, MdPersonAddAlt1, MdViewList } from 'react-icons/md';
import { GiMedicinePills } from "react-icons/gi";
import { FaUsersViewfinder } from "react-icons/fa6"

import {
  APPOINTMENTS,
  DASHBOARD_PATH,
  MEDICINES,
  NEW_APPOINTMENT_PATH,
  NEW_PATIENT_PATH,
  NEW_USER_PATH,
  PATIENTS,
  PROCEDURES,
  PURCHASE_ORDERS,
  SALES_ORDERS,
  SUPPLIERS,
  USERS,
} from 'src/constants/paths';
import { RiCalendarView, RiHeartAdd2Fill } from 'react-icons/ri';
import { HiUserAdd } from 'react-icons/hi';

export const globalOptions = [
  {
    title: 'DASHBOARD',
    icon: <FcBullish size="24px" />,
    route: DASHBOARD_PATH, 
    tooltip: 'Dashboard', 
  },
  {
    title: 'APPOINTMENTS',
    icon: <FcCalendar size="24px" />,
    options: [
      {
        title: 'Add New Appointment',
        icon: <RiHeartAdd2Fill size="18px" />,
        route: NEW_APPOINTMENT_PATH,
        isSubItem: true,
        tooltip: 'Add New Appointment', 
      },
      {
        title: 'View Appointments',
        icon: <RiCalendarView size="18px" />,
        route: APPOINTMENTS,
        isSubItem: true,
        tooltip: 'View Appointments', 
      }
    ],
    tooltip: 'Appointments', 
  },
  {
    title: 'PATIENTS',
    icon: <FcConferenceCall size="24px" />,
    options: [
      {
        title: 'Add New Patient',
        icon: <MdPersonAddAlt1 size="18px" />,
        route: NEW_PATIENT_PATH,
        isSubItem: true,
        tooltip: 'Add New Patient', 
      },
      {
        title: 'View Patients',
        icon: <MdViewList size="18px" />,
        route: PATIENTS,
        isSubItem: true,
        tooltip: 'View Patients', 
      },
      {
        title: 'View Procedures',
        icon: <FaProcedures size="18px" />,
        route: PROCEDURES,
        isSubItem: true,
        tooltip: 'View Procedures', 
      },
    ],
    tooltip: 'Patients', 
  },
  {
    title: 'INVENTORY',
    icon: <FcFilingCabinet size="24px" />,
    options: [
      {
        title: 'Medicines',
        icon: <GiMedicinePills size="18px" />,
        route: MEDICINES,
        tooltip: 'Medicines', 
      },
      {
        title: 'Purchase Orders',
        icon: <FaCartPlus size="18px" />,
        route: PURCHASE_ORDERS,
        tooltip: 'Purchase Orders', 
      },
      {
        title: 'Sales Orders',
        icon: <MdBarChart size="18px" />,
        route: SALES_ORDERS,
        tooltip: 'Sales Orders', 
      },
      {
        title: 'Suppliers',
        icon: <FaTruck size="18px" />,
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
    options: [
      {
        title: 'Add New User',
        icon: <HiUserAdd size="18px" />,
        route: NEW_USER_PATH,
        isSubItem: true,
        tooltip: 'Add New User', 
      },
      {
        title: 'View Users',
        icon: <FaUsersViewfinder size="18px" />,
        route: USERS,
        isSubItem: true,
        tooltip: 'Vies Users', 
      },
    ],
    tooltip: 'Users', 
  },
];
