import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      console.log('tokentokentokentoken', token)
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
      return Promise.reject(err);
    }
  );
};

export default setup;