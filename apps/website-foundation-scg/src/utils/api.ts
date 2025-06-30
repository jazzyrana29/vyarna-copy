// /src/utils/api.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Constants from "expo-constants";

const { apiUrl } = Constants.expoConfig?.extra || {};

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST interceptor: attach auth token if present
api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // make sure headers object exists
    config.headers = config.headers ?? {};

    // const token = await SecureStore.getItemAsync("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// RESPONSE interceptor: handle global errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    console.log("error in interseptor => ", error);
    if (error.response) {
      // const { status } = error.response;
      // if (status === 401) {
      //   await SecureStore.deleteItemAsync("authToken");
      //   // e.g. NavigationService.navigate('Login');
      // }
      // handle other statuses here if you like
    }
    return Promise.reject(error);
  },
);

export default api;
