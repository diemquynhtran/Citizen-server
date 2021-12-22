import { LoginRequest } from "models/user";
import api from ".";
const baseURL = "/auth";
export const authApi = {
  login: (request: LoginRequest) => {
    return api.post(`${baseURL}/login`, { ...request });
  },
};
