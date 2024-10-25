import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { PATIENTS_ROUTE } from 'src/api/patients/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getPatientList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Patient>>(PATIENTS_ROUTE, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetPatientList = <Override = PaginatedResponse<Patient>>(
  opts?: UseQueryOption<PaginatedResponse<Patient>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['patients', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Patient>>({
    queryKey,
    queryFn: ({ signal }) => getPatientList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};
