"use client";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { accessToken, setAccessToken } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true, // <-- sends refresh cookie automatically
  });

  // --- 1) Add access token to all requests ---
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // --- 2) Handle expired token ---
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // if access token expired AND we haven't retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        console.log("Refreshing");

        try {
          // call refresh endpoint
          const refreshResponse = await axios.post(
            "http://localhost:9000/user/refresh",
            {},
            { withCredentials: true }
          );

          const newToken = refreshResponse.data.accessToken;

          console.log({ "New Refresh Token": newToken });

          // update memory storage
          setAccessToken(newToken);

          // retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // refresh also failed → logout user
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
