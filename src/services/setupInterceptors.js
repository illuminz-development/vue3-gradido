import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (router) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = token; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      // Unauthorized request
      if(err.response.status == '401'){
        TokenService.removeUser();
        router.push('/signin')
      }

      return Promise.reject(err);
    }
  );
};

export default setup;