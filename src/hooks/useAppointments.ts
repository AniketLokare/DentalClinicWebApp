import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { APPOINTMENTS_ROUTE, getAppointmentsWithIdRoute } from 'src/api/appointments/routes';
import axiosClient from 'src/util/axios';

export const getAppointmentsList = (config?: AxiosRequestConfig) =>
    axiosClient
        .get<PaginatedResponse<Appointments>>(APPOINTMENTS_ROUTE, config)
        .then((res) => res.data);

export const createAppointments = (
    payload: CreateAppointmentsPayload,
    config?: AxiosRequestConfig,
) => axiosClient.post<Appointments>(APPOINTMENTS_ROUTE, payload, config);

export const patchAppointments = (id: string, payload: CreateAppointmentsPayload) =>
    axiosClient.patch<Appointments, CreateAppointmentsPayload>(
        getAppointmentsWithIdRoute(id),
        payload,
    );

export const getAppointmentsDetail = (id: string, config?: AxiosRequestConfig) =>
    axiosClient
        .get<Appointments>(getAppointmentsWithIdRoute(id), config)
        .then((res) => res.data);

export const deleteAppointments = (id: string) =>
    axiosClient.delete<null>(getAppointmentsWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetAppointmentsList = <Override = PaginatedResponse<Appointments>>(
    opts?: UseQueryOption<PaginatedResponse<Appointments>, Override>,
) => {
    const { key, useQueryConfig, apiConfig } = opts || {};
    const queryKey = (key || ['appointments', apiConfig.params]) as QueryKey;

    const { data, ...rest } = useQuery<PaginatedResponse<Appointments>>({
        queryKey,
        queryFn: ({ signal }) => getAppointmentsList({ ...apiConfig, signal }),
        enabled: !!apiConfig,
        ...useQueryConfig,
    });

    return { response: data, ...rest };
};

export const useCreateAppointments = (
    opts?: MutationConfig<Appointments, CreateAppointmentsPayload>,
) => {
    return useMutation({
        mutationFn: (payload: CreateAppointmentsPayload) => createAppointments(payload),
        ...opts,
    });
};

export const usePatchAppointments = (
    id: string,
    opts?: MutationConfig<Appointments, CreateAppointmentsPayload>,
) => {
    return useMutation({
        mutationFn: (payload: CreateAppointmentsPayload) => {
            return patchAppointments(id, payload);
        },
        ...opts,
    });
};

export const useGetAppointmentsDetail = <Override = Appointments>(
    opts: SingleUseQueryOption<Appointments, Override>,
) => {
    const { apiConfig, id } = opts;
    const queryKey = ['registry', id] as QueryKey;
    return useQuery({
        queryKey,
        queryFn: ({ signal }) => getAppointmentsDetail(id, { ...apiConfig, signal }),
        enabled: !!id,
    });
};

export const useDeleteAppointments = (opts?: MutationConfig<null, string>) => {
    return useMutation({
        mutationFn: (id: string) => deleteAppointments(id),
        ...opts,
    });
};