import api from ".";
const baseURL = "/province";
export const provinceApi = {
  getProvinces: () => {
    return api.get(`${baseURL}/`);
  },
};
