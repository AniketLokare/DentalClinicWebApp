import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getMedicinesWithIdRoute, MEDICINES_ROUTE } from 'src/api/medicine/routes';
import axiosClient from 'src/util/axios';

export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES_ROUTE, config)
    .then((res) => res.data);

export const createMedicines = (
  payload: CreateMedicinePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Medicine>(MEDICINES_ROUTE, payload, config);

export const getMedicinesDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getMedicinesWithIdRoute(id), config)
    .then((res) => res.data);

export const patchMedicines = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    getMedicinesWithIdRoute(id),
    payload,
  );

export const deleteMedicines = (id: string) =>
  axiosClient.delete<null>(getMedicinesWithIdRoute(id));

export const useGetMedicinesList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['medicines', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateMedicines = (
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => createMedicines(payload),
    ...opts,
  });
};

export const useGetMedicinesDetail = <Override = Medicine>(
  opts: SingleUseQueryOption<Medicine, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getMedicinesDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchMedicines = (
  id: string,
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => {
      return patchMedicines(id, payload);
    },
    ...opts,
  });
};

export const useDeleteMedicines = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteMedicines(id),
    ...opts,
  });
};
