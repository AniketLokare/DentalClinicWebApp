import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getUserWithIdRoute, USERS_ROUTE } from 'src/api/users/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getUsersList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<User[]>>(USERS_ROUTE, config)
    .then((res) => res.data);

export const deleteUser = (id: string) =>
  axiosClient.delete<null>(getUserWithIdRoute(id));

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

export const useDeleteUser = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    ...opts,
  });
};
