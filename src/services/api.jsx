import axios from "axios";
import TokenService from "./token-service";
import { SOMETHING_WENT_WRONG } from "../common/constants";

const instance = axios.create({
  baseURL: "https://nice247.pro/backend/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken("user");
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    
    // Ensure data is properly stringified for POST requests
    if (config.method === 'post' && config.data) {
      config.data = JSON.stringify(config.data);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig?.url !== "login/gamma/authenticate" && err.response) {
      const NO_RETRY_HEADER = 'x-no-retry';
      
      if (err.response.status === 403 && !originalConfig.headers?.[NO_RETRY_HEADER]) {
        originalConfig.headers = {
          ...originalConfig.headers,
          [NO_RETRY_HEADER]: 'true'
        };

        try {
          const rs = await instance.post("login/gamma/refreshAccessToken", {
            refreshToken: TokenService.getLocalRefreshToken()
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          // Ensure the original request data is properly stringified
          if (originalConfig.method === 'post' && originalConfig.data) {
            originalConfig.data = JSON.stringify(originalConfig.data);
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    } else if (err.response?.status === 401 && err.response.data === SOMETHING_WENT_WRONG) {
      // Ensure retry request data is properly stringified
      if (originalConfig.method === 'post' && originalConfig.data) {
        originalConfig.data = JSON.stringify(originalConfig.data);
      }
      return instance(originalConfig);
    }

    return Promise.reject(err);
  }
);

export default instance;