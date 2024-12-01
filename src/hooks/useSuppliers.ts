import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { SUPPLIERS_ROUTE } from "src/api/inventory/suppliers/routes";
import axiosClient from "src/util/axios";

/**
 * API
 */
export const getSuppliersList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Supplier>>(SUPPLIERS_ROUTE, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetSuppliersList = <Override = PaginatedResponse<Supplier>>(
  opts?: UseQueryOption<PaginatedResponse<Supplier>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['suppliers', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Supplier>>({
    queryKey,
    queryFn: ({ signal }) => getSuppliersList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};