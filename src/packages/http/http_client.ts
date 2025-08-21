import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export type HttpHandler = AxiosInstance;

export const setInterceptors = (axiosInstances: AxiosInstance[]) => {
  const onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.headers.Authorization = token ? `${JSON.parse(token)}` : "";

    return config;
  };

  axiosInstances.forEach((http) => {
    http.interceptors.request.use(onRequest, (error) => Promise.reject(error));
  });
};

export { axios };
