import axios from "axios";
import { showLoader, hideLoader } from "../utils/loader";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {

    // 🔥 START GLOBAL LOADER
    showLoader();

    // 🔑 Attach access token
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);


/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(

  // ✅ SUCCESS
  (response) => {
    hideLoader(); // 🔥 STOP LOADER
    return response;
  },

  // ❌ ERROR
  async (error) => {

    hideLoader(); // 🔥 STOP LOADER

    const originalRequest = error.config;

    // 🔄 TOKEN REFRESH
    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      try {

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}auth/token/refresh/`,
          { refresh }
        );

        // 🔑 Save new access token
        localStorage.setItem("access", res.data.access);

        // 🔁 Retry original request
        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (refreshError) {

        // ❌ Refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";

      }
    }

    return Promise.reject(error);
  }
);

export default api;