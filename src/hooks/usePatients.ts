import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { PATIENTS_ROUTE } from 'src/api/patients/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getPatientList = (config?: AxiosRequestConfig) =>
  axiosClient.get<Patient[]>(PATIENTS_ROUTE, config);

/**
 * HOOKS
 */
export const useGetPatientList = <Override = Patient[]>(
  opts?: UseQueryOption<Patient[], Override>,
) => {
  const {
    key,
    useQueryConfig,
    apiConfig = { params: { limit: '500' } },
  } = opts || {};
  const queryKey = (key || ['patients']) as QueryKey;

  return useQuery<Patient[]>({
    queryKey,
    queryFn: ({ signal }) => getPatientList({ ...apiConfig, signal }),
    ...useQueryConfig,
  });
};
