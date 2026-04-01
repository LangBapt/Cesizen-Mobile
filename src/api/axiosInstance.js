import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.176.137.144:3000/api"; 

const api = axios.create({ 
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        
      
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });

        if (res.data.accessToken) {
          await AsyncStorage.setItem("accessToken", res.data.accessToken);
          await AsyncStorage.setItem("refreshToken", res.data.refreshToken);

      
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;