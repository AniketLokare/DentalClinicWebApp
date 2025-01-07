import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getAppointmentWithIdRoute, APPOINTMENTS_ROUTE } from 'src/api/appointments/routes.ts'; // Update the import to use Appointment-specific routes
import axiosClient from 'src/util/axios';

/**
 * Backend TODO:
 * - Support pagination
 * - Support filtering
 * - Support sorting
 * - Support searching
 * - appointmentId and timestamp should be auto-generated
 * - Support PATCH request for updating appointment
 * - API validations for CreateAppointmentPayload
 */

/**
 * API
 */
export const getAppointmentList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Appointment>>(APPOINTMENTS_ROUTE, config)
    .then((res) => res.data);

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

/**
 * HOOKS
 */
export const useGetAppointmentList = <Override = PaginatedResponse<Appointment>>(
  opts?: UseQueryOption<PaginatedResponse<Appointment>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['appointments', apiConfig.params]) as QueryKey;

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

export const useGetAppointmentDetail = <Override = Appointment>(
  opts: SingleUseQueryOption<Appointment, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['appointment', id] as QueryKey;
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
