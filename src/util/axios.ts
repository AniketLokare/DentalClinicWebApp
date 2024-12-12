import axios from 'axios';

export const initAxiosClient = (baseURL?: string) => {
  const axiosClient = axios.create({
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    ...(baseURL ? { baseURL } : {}),
  });
  return axiosClient;
};

const axiosClient = initAxiosClient(import.meta.env.VITE_API_BASE_URL);

// Add Authorization dynamically
axiosClient.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosClient;
