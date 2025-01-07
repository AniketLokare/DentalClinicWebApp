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
    ConfirmationModal,
    LoadingBackdrop,
} from 'src/components';
import { listAppointmentsBreadcrumbLinks, appointmentsTableColumns } from './constants';
import { useDeleteAppointments, useGetAppointmentsList } from 'src/hooks/useAppointments';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/util/common';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditAppointmentsRoute, getViewAppointmentsPath } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';

const Appointments: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<FiltersState>();
    const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

    const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
        useSnackbarAlert();

    const { pageNumber, changePageNumber } = usePagination();
    const { response, isFetching, isError, refetch } = useGetAppointmentsList({
        apiConfig: {
            params: {
                _page: pageNumber,// TODO: Change this to full text search
                patientName: debouncedSearchQuery,
            },
        },
    });

    const { mutate: deleteAppointments, isPending: isDeleteInProgress } =
        useDeleteAppointments({
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
    } = useDeleteConfirmationModal({ onDelete: deleteAppointments });

    const noData = !response?.data?.length;

    const appointmentsTableColumnsWithActions = useMemo(
        () => [
            ...appointmentsTableColumns,
            {
                header: 'Appointment Date',
                accessorKey: 'appointmentDate',
                cell: ({ getValue }) => (
                    <Box className="text-slate-gray">{formatDate(getValue())}</Box>
                ),
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    const appointmentsValues = row.original;
                    return (
                        <Actions
                            onAddClick={() => {
                                navigate(getEditAppointmentsRoute(appointmentsValues.id));
                            }}
                            onEditClick={() => {
                                navigate(getEditAppointmentsRoute(appointmentsValues.id));
                            }}
                            onDeleteClick={() => {
                                onShowDeleteConfirmationModal(
                                    appointmentsValues.id,
                                    appointmentsValues.firstName,
                                );
                            }}
                            onViewDetails={() => {
                                navigate(getViewAppointmentsPath(appointmentsValues.id));
                            }}
                        />
                    );
                },
            },
        ],
        [],
    );

    return (
        <>
            <Snackbar
                open={!!snackbarAlertState.message}
                severity={snackbarAlertState.severity}
                message={snackbarAlertState.message}
                onClose={onDismiss}
            />
            <LoadingBackdrop loading={isDeleteInProgress} />
            <Stack spacing={2}>
                <SubPanel
                    pageTitle="APPOINTMENTS"
                    breadcrumbLinks={listAppointmentsBreadcrumbLinks}
                />
                <TableContainer
                    onFiltersChange={(filters) => {
                        setFilters(filters);
                    }}
                    placeholder="Search By Patient Name"
                >
                    {({ showFilters }) => (
                        <Box>
                            <PageLoader
                                isLoading={isFetching}
                                isEmpty={(noData && !isError) || (noData && showFilters)}
                                emptyMessage="No patients found"
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