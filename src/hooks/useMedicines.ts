import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { getViewMedicinePath, MEDICINES } from "src/constants/paths";
import axiosClient from "src/util/axios";
import { MEDICINES_ROUTE } from "src/constants/paths";
import { useState } from "react";

/**
 * API Functions
 */
export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES, config)
    .then((res) => res.data);

export const createMedicine = (
  payload: CreateMedicinePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Medicine>(MEDICINES_ROUTE, payload, config);

export const getMedicineDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getViewMedicinePath(id), config)
    .then((res) => res.data);

export const patchMedicine = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    getViewMedicinePath(id),
    payload,
  );

export const deleteMedicine = (id: string) =>
  axiosClient.delete<null>(getViewMedicinePath(id));

/**
 * React Query Hooks
 */
export const useGetMedicinesList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ["medicines", apiConfig?.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesList({ ...apiConfig, signal }),
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
  const queryKey = ["medicine", id] as QueryKey;

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
    mutationFn: (payload: CreateMedicinePayload) => patchMedicine(id, payload),
    ...opts,
  });
};

export const useDeleteMedicine = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteMedicine(id),
    ...opts,
  });
};

/**
 * Delete Confirmation Modal Hook
 */
export const useDeleteConfirmationModal = (onDelete: (id: string) => void) => {
  const [modalValues, setModalValues] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: string, name: string) => {
    setModalValues({ id, name });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    onDelete(modalValues.id);
    setIsModalOpen(false);
  };

  return {
    modalValues,
    isModalOpen,
    showModal,
    closeModal,
    confirmDelete,
  };
};
