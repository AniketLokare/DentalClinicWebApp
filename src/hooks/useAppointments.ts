import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { APPOINTMENTS_ROUTE, getAppointmentsWithIdRoute } from 'src/api/appointments/routes';
import axiosClient from 'src/util/axios';
import { useState } from 'react';

export const getAppointmentsList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Appointment>>(APPOINTMENTS_ROUTE, config)
    .then((res) => res.data);

export const createAppointment = (
  payload: CreateAppointmentPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Appointment>(APPOINTMENTS_ROUTE, payload, config);

export const patchAppointment = (id: string, payload: CreateAppointmentPayload) =>
  axiosClient.patch<Appointment, CreateAppointmentPayload>(
    getAppointmentsWithIdRoute(id),
    payload,
  );

export const getAppointmentDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure>(getAppointmentsWithIdRoute(id), config)
    .then((res) => res.data);

export const deleteAppointment = (id: string) =>
  axiosClient.delete<null>(getAppointmentsWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetAppointmentsList = <Override = PaginatedResponse<Appointment>>(
  opts?: UseQueryOption<PaginatedResponse<Appointment>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['appointments', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Appointment>>({
    queryKey,
    queryFn: ({ signal }) => getAppointmentsList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateAppointment = (
  opts?: MutationConfig<Appointment, CreateAppointmentPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => createAppointment(payload),
    ...opts,
  });
};

export const usePatchAppointment = (
  id: string,
  opts?: MutationConfig<Appointment, CreateAppointmentPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => {
      return patchAppointment(id, payload);
    },
    ...opts,
  });
};

export const useGetAppointmentDetail = <Override = Appointment>(
  opts: SingleUseQueryOption<Appointment, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getAppointmentDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const useDeleteAppointment = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    ...opts,
  });
};

interface DeleteConfirmationModalValuesm {
  id: string;
  name: string;
}

type UseDeleteProps = {
  onDelete: (id: string) => void;
};

export const useDeleteConfirmationModalm = (props: UseDeleteProps) => {
  const { onDelete } = props;
  const [deleteConfirmationModalValuesm, setDeleteConfirmationModalValuesm] =
    useState<DeleteConfirmationModalValuesm>({ id: '', name: '' });
  const [showDeleteConfirmationModalm, setShowDeleteConfirmationModalm] =
    useState<boolean>(false);

  const onDeleteConfirm = () => {
    onDelete(deleteConfirmationModalValuesm.id);
    setShowDeleteConfirmationModalm(false);
  };

  const onShowDeleteConfirmationModalm = (id: string, name: string) => {
    setDeleteConfirmationModalValuesm({ id, name });
    setShowDeleteConfirmationModalm(true);
  };

  const onClose = () => setShowDeleteConfirmationModalm(false);

  return {
    deleteConfirmationModalValuesm,
    showDeleteConfirmationModalm,
    onDeleteConfirm,
    onShowDeleteConfirmationModalm,
    onClose,
  };
};

export default useDeleteConfirmationModalm;