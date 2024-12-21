import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { APPOINTMENTS } from 'src/constants/paths';
import axiosClient from 'src/util/axios';
import {
    getAppointmentWithIdRoute,
    APPOINTMENTS_ROUTE
} from 'src/api/appointment/routes';
import { useState } from 'react';

/**
 * API
 */
export const getAppointmentList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Appointment>>(APPOINTMENTS, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetAppointmentsList = <Override = PaginatedResponse<Appointment>>(
  opts?: UseQueryOption<PaginatedResponse<Appointment>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['appointment', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Appointment>>({
    queryKey,
    queryFn: ({ signal }) => getAppointmentList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const createAppointment = (
  payload: CreateAppointmentPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Appointment>(APPOINTMENTS_ROUTE, payload, config);

export const getAppointmentDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Appointment>(getAppointmentWithIdRoute(id), config)
    .then((res) => res.data);

export const patchAppointment = (id: string, payload: CreateAppointmentPayload) =>
  axiosClient.patch<Appointment, CreateAppointmentPayload>(
    getAppointmentWithIdRoute(id),
    payload,
  );

export const deleteAppointment = (id: string) =>
  axiosClient.delete<null>(getAppointmentWithIdRoute(id));

export const useCreateAppointment = (
  opts?: MutationConfig<Appointment, CreateAppointmentPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      createAppointment(payload),
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
