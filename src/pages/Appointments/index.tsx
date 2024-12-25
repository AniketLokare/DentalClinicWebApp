import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Actions,
  Snackbar,
  LoadingBackdrop,
  Icon,
} from 'src/components';
import {
  listAppointmentsBreadcrumbLinks,
  appointmentsTableColumns,
} from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditAppointmentRoute,
  getViewAppointmentPath,
} from 'src/constants/paths';
import {
  useDeleteAppointment,
  useGetAppointmentList,
} from 'src/hooks/useAppointments';
import { usePagination } from 'src/hooks/usePagination';
import { formatDate } from 'src/util/common';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Appointments: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetAppointmentList({
    apiConfig: {
      params: {
        _page: pageNumber,
        firstName: debouncedSearchQuery, // Adjust this for full-text search
      },
    },
  });

  const { mutate: deleteAppointment, isPending: isDeleteInProgress } =
    useDeleteAppointment({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Appointment Deleted.',
          message: `Appointment "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
        });

        refetch();
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    });

  const {
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({ onDelete: deleteAppointment });

  const noData = !response?.data?.length;

  const appointmentsTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'avatar',
        cell: ({ row }) => {
          const appointmentValues = row.original;
          const icon =
            appointmentValues.patientGender === 'male'
              ? 'businessman'
              : 'businesswoman';
          return <Icon icon={icon} size="30px" />;
        },
      },
      ...appointmentsTableColumns.map((col, index) => {
        
        if (col.header === 'Cashier Name') {
          return [
            col, ];
        }
        return col;
      }).flat(),
     
      {
        id: 'actions',
        cell: ({ row }) => {
          const appointmentValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditAppointmentRoute(appointmentValues.id));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  appointmentValues.id,
                  appointmentValues.firstName
                );
              }}
            />
          );
        },
      },
      {
        header: 'View Details',
        id: 'viewDetails',
        cell: ({ row }) => {
          const appointmentValues = row.original;
          return (
            <Box
              className="text-blue cursor-pointer"
              onClick={() =>
                navigate(getViewAppointmentPath(appointmentValues.id)) 
              }
            >
              View Details
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <LoadingBackdrop loading={isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="APPOINTMENTS"
          breadcrumbLinks={listAppointmentsBreadcrumbLinks}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Appointment Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No appointments found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={appointmentsTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

export default Appointments;
