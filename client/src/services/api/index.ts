import axios from "axios";
import { history } from "helpers/history";
import { toastService } from "helpers/toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  responseType: "json",
});

export const setupAxios = () => {
  const requestHandler = (request: any) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      request.headers.token = `Bearer ${authToken}`;
    }

    return request;
  };

  const successHandler = (response: any) => {
    return response;
  };

  const errorHandler = (error: any) => {
    const errorRes = error.response;
    if (errorRes) {
      if (errorRes.status === 401) {
        history.push("/login");
        return toastService.error("Phiên đăng nhập đã hết hạn");
      } else {
        return showError({
          error: errorRes.data || {},
          status: errorRes.status,
        });
      }
    } else {
      toastService.error("Một lỗi không mong muốn đã xảy ra");
    }
    return Promise.reject(error);
  };
  interface ResponseError {
    error: any;
    status: any;
  }
  const showError = (res: ResponseError) => {
    const { error, status } = res;
    // let title = i18n.t('AbpAccount::DefaultErrorMessage');
    let message = "Có lỗi xảy ra!";
    if (typeof error === "string") {
      message = error;
    } else if (error.details) {
      message = error.details;
    } else if (error.message) {
      message = error.message;
    } else {
      switch (status) {
        case 401:
          message = "Phiên đăng nhập đã hết hạn!";
          return;
        case 403:
          message = "Bạn không thể thực hiện chức năng này!";
          break;
        case 500:
          message = "Có lỗi xảy ra!";
          break;
        default:
          break;
      }
    }
    return { data: { message }, status };
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));
  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
};

export default axiosInstance;
