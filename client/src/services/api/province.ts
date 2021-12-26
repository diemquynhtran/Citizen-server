import api from ".";
const getbaseURL = "/province";
const postbaseURL = "/province/create";
export const provinceApi = {
  getProvinces: () => {
    return api.get(`${getbaseURL}/`);
  },

  postProvinces: (infoprovin:any) => {
    return api.post(`${postbaseURL}/`,infoprovin);
  },
};
