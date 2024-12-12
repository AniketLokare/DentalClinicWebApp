import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { PROCEDURES_ROUTE, deleteProcedureWithIdRoute, editProcedureWithIdRoute, getProceduresListByProcedureIdRoute } from 'src/api/procedures/routes';
import { NEW_PROCEDURE_PATH } from 'src/constants/paths';
import axiosClient from 'src/util/axios';

export const getProceduresList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure[]>(PROCEDURES_ROUTE, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createProcedure = (
  id: string,
  payload: CreateProcedurePayload,
  config?: AxiosRequestConfig,
) => {
  const updatedPayload = { ...payload, patientId: id };
  return axiosClient.post<Procedure>(NEW_PROCEDURE_PATH, updatedPayload, config);
};

export const patchProcedure = (id: string, payload: CreateProcedurePayload) =>
  axiosClient.patch<Procedure, CreateProcedurePayload>(
    editProcedureWithIdRoute(id),
    payload,
  );

export const getProcedureDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure>(getProceduresListByProcedureIdRoute(id), config)
    .then((res) => res.data);

export const deleteProcedure = (id: string) =>
  axiosClient.delete<null>(deleteProcedureWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetProceduresList = <Override = PaginatedResponse<Procedure>>(
  opts?: UseQueryOption<PaginatedResponse<Procedure>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['procedures', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Procedure>>({
    queryKey,
    queryFn: ({ signal }) => getProceduresList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateProcedure = (
  id: string,
  opts?: MutationConfig<Procedure, CreateProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateProcedurePayload) => createProcedure(id, payload),
    ...opts,
  });
};

export const usePatchProcedure = (
  id: string,
  opts?: MutationConfig<Procedure, CreateProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateProcedurePayload) => {
      return patchProcedure(id, payload);
    },
    ...opts,
  });
};

export const useGetProcedureDetail = <Override = Procedure>(
  opts: SingleUseQueryOption<Procedure, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getProcedureDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });

  return { response: data, ...rest };
};

export const useDeleteProcedure = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteProcedure(id),
    ...opts,
  });
};