import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config);

  axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  axiosInstance.interceptors.request.use(
    (config: any) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error?.response?.status) {
        case 401:
          window.location.href = '/login';
          localStorage.removeItem('accessToken');
          break;
        case 400:
          break;
        case 404:
          // window.location.href = '/404';
          break;
        case 422:
          break;
        case 500:
          // window.location.href = '/500';
          break;
        default:
          console.log('error');
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default initialization;
