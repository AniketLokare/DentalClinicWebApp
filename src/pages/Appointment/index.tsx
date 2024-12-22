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
  LoadingBackdrop
} from 'src/components';
import {
  listAppointmentsBreadcrumbLinks,
  AppointmentTableColumns,
} from './constants';
import { useNavigate } from 'react-router-dom';
import {
  getEditAppointmentRoute,
  getViewAppointmentPath,
  NEW_APPOINTMENT_PATH,
} from 'src/constants/paths';
import {
  useDeleteAppointment,
  useGetAppointmentsList,
} from 'src/hooks/useAppointments';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import ConfirmationModal from 'src/components/ConfirmationModal';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { FiUser } from 'react-icons/fi';

const Appointments: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetAppointmentsList({
    apiConfig: {
      params: {
        _page: pageNumber,
        // TODO: Change this to full text search
        firstName: debouncedSearchQuery,
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
        cell: () => <FiUser size="20px" />,
      },
      ...AppointmentTableColumns,
      
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
                  appointmentValues.firstName,
                )
              }}
              onViewDetails={() => {
                navigate(getViewAppointmentPath(appointmentValues.id));
              }}
            />
          );
        },
      },
    ],
    [navigate],
  );

  return (
    <>
      <LoadingBackdrop loading={!!isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={1}>
        <SubPanel
          pageTitle="APPOINTMENT"
          breadcrumbLinks={listAppointmentsBreadcrumbLinks}
          rightSideButtonText="New Appointment"
          rightSideButtonClickEvent={() => {
            navigate(NEW_APPOINTMENT_PATH);
          }}
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
                emptyMessage="No Appointment found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={appointmentsTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items || 0}
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
