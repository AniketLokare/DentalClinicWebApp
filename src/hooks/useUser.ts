import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { USERS_ROUTE } from 'src/api/users/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getUsersList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<User[]>>(USERS_ROUTE, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetUsersList = <Override = PaginatedResponse<User>>(
  opts?: UseQueryOption<PaginatedResponse<User>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['users', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<User>>({
    queryKey,
    queryFn: ({ signal }) => getUsersList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};