import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getMedicineWithIdRoute, MEDICINES_ROUTE } from 'src/api/medicines/routes';
import axiosClient from 'src/util/axios';

/**
 * Backend TODO:
 * - Support pagination
 * - Support filtering
 * - Support sorting
 * - Support searching
 * - patientId and timestamp should be auto-generated
 * - Support PATCH request for updating patient
 * - File upload for patientReports
 * - API validations for CreatePatientPayload
 * - Send newly created patient object in create/edit response
 */

/**
 * API
 */
export const getMedicineList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES_ROUTE, config)
    .then((res) => res.data);

export const createMedicine = (
  payload: CreateMedicinePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Medicine>(MEDICINES_ROUTE, payload, config);

export const getMedicineDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getMedicineWithIdRoute(id), config)
    .then((res) => res.data);

export const patchMedicine = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    getMedicineWithIdRoute(id),
    payload,
  );

export const deleteMedicine = (id: string) =>
  axiosClient.delete<null>(getMedicineWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetMedicineList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['medicines', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicineList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateMedicine = (
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => createMedicine(payload),
    ...opts,
  });
};

export const useGetMedicineDetail = <Override = Medicine>(
  opts: SingleUseQueryOption<Medicine, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getMedicineDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchMedicine = (
  id: string,
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => {
      return patchMedicine(id, payload);
    },
    ...opts,
  });
};

export const useDeleteMedicine = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteMedicine(id),
    ...opts,
  });
};
