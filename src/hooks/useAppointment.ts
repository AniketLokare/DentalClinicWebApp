import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { APPOINTMENT_ROUTE } from 'src/api/appointment/routes';
import { getAppointmentsWithIdRoute } from 'src/api/appointment/routes';
import axiosClient from 'src/util/axios';

export const getAppointmentList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Appointment>>(APPOINTMENT_ROUTE, config)
    .then((res) => res.data);

export const createAppointment = (
  payload: CreateAppointmentPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Appointment>(APPOINTMENT_ROUTE, payload, config);

export const patchAppointment = (id: string, payload: CreateAppointmentPayload) =>
  axiosClient.patch<Appointment, CreateAppointmentPayload>(
    getAppointmentsWithIdRoute(id),
    payload,
  );

export const getAppointmentDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Appointment>(getAppointmentsWithIdRoute(id), config)
    .then((res) => res.data);

export const deleteAppointment = (id: string) =>
  axiosClient.delete<null>(getAppointmentsWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetAppointmentList = <Override = PaginatedResponse<Appointment>>(
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