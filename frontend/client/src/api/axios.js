import axios from "axios";
import queryString from "query-string";

const API_URL = process.env.REACT_APP_API_URL;
const CHAT_API_URL = process.env.REACT_APP_API_CHAT_URL;

//Tạo instance của axios
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

//Interceptor thêm auth header vào request trước khi gửi đi
axiosClient.interceptors.request.use((req) => {
  // Xử lý request trước khi gửi đi, thêm header token vào
  const token = getAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const getAccessToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("current_user"));
    const tempAccessToken = localStorage.getItem("temp_access_token");
    if (user && user.accessToken) {
      return user.accessToken;
    } else if (tempAccessToken) {
      return tempAccessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("current_user"));
  if (user && user.refreshToken) {
    return user.refreshToken;
  } else return "";
};

let isRefreshing = false;
const refreshSubscribers = [];

//Lưu lại danh sách các request fail do 401, thực hiện lại sau khi lấy đc accessToken mới
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Hàm để xử lý yêu cầu gửi lại sau khi refresh token thành công
const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers.length = 0;
};

//Hàm lấy refresh token nếu request gặp lỗi 401
const refreshAccessToken = () => {
  return new Promise((resolve, reject) => {
    const refreshToken = getRefreshToken();
    const axiosRefreshClient = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    axiosRefreshClient
      .post("/auth/refresh-token")
      .then((response) => {
        // Xử lý phản hồi thành công
        const user = JSON.parse(localStorage.getItem("current_user"));
        const updatedUser = {
          ...user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
        localStorage.setItem("current_user", JSON.stringify(updatedUser));
        localStorage.setItem("validSession", "true");
        window.dispatchEvent(new Event("storage"));
        resolve(response.data.accessToken);
      })
      .catch((error) => {
        // Xử lý lỗi
        localStorage.setItem("validSession", "false");
        window.dispatchEvent(new Event("storage"));
        console.log(error);
        if (error.response && error.response.status === 400) {
          localStorage.removeItem("current_user");
          localStorage.removeItem("temp_access_token");
          window.location.href = "/login";
        }
        reject(error);
      });
  });
};

axiosClient.interceptors.response.use(
  // Xử lý khi response thành công trả về
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  // Xử lý lỗi
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login")
    ) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshAccessToken()
          .then((token) => {
            isRefreshing = false;
            onRefreshed(token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((refreshError) => {
            isRefreshing = false;
            return Promise.reject(refreshError);
          });
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
