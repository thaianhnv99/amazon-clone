import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  Method,
} from "axios";
import qs from "qs";
import { sleep } from "../shared/utils/util";

export const setupAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    paramsSerializer(params) {
      return qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
        allowDots: true,
        filter: (prefix, value) =>
          value !== undefined && value !== null && value !== ""
            ? value
            : undefined,
      });
    },
  });

  instance.interceptors.response.use(async (response) => {
    // add artificial delay for dev env
    if (process.env.NODE_ENV === "development") {
      await sleep();
    }
    return response;
  });

  const fetch = async <T>({
    method,
    url,
    options,
  }: {
    method: Method;
    url: string;
    options?: AxiosRequestConfig;
  }): Promise<AxiosResponse> => {
    // Handle
    const response = (await instance({
      method,
      url,
      ...options,
      //   headers: { Authorization: getAuthorizationHeader() },
    }));

    return response;
  };

  const apiClient = {
    get: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "get",
        url,
        options: {
          ...options,
          params,
        },
      }),
    post: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "post",
        url,
        options: {
          ...options,
          data,
        },
      }),
    patch: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "patch",
        url,
        options: {
          ...options,
          data,
        },
      }),
    put: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "put",
        url,
        options: {
          ...options,
          data,
        },
      }),
    delete: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "delete",
        url,
        options: {
          ...options,
          params,
        },
      }),
  };

  return { apiClient };
};

export const { apiClient } = setupAxios();
