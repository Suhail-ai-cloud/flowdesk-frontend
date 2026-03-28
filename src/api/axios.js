import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔑 Attach access token
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// 🔄 Auto refresh token
api.interceptors.response.use(

  res => res,

  async (err) => {

    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      try {

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}auth/token/refresh/`,
          { refresh }
        );

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (error) {

        localStorage.clear();
        window.location.href = "/login";

      }
    }

    return Promise.reject(err);
  }
);

export default api;