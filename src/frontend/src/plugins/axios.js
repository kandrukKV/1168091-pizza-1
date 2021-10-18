import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    console.log("Возникла ошибка при выполнении запроса к серверу");
    return Promise.reject(e);
  }
);

export default axiosInstance;
