import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getMedicineWithIdRoute } from 'src/api/medicine/routes';
import { MEDICINES } from 'src/constants/paths';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES, config)
    .then((res) => res.data);

export const deleteMedicine = (id: string) =>
  axiosClient.delete<null>(getMedicineWithIdRoute(id));

export const getMedicineDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getMedicineWithIdRoute(id), config)
    .then((res) => res.data);

export const patchMedicine = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    getMedicineWithIdRoute(id),
    payload,
  );
/**
 * HOOKS
 */
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

export const useGetMedicineDetail = <Override = Medicine>(
  opts: SingleUseQueryOption<Medicine, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['medicine', id] as QueryKey;
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
