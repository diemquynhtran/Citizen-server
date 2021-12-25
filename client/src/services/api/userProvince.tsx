import api from ".";
const getbaseURL = "/user/province";
const postbaseURL = "/user/province/create";
export const userprovinceApi = {
  getUserProvinces: () => {
    return api.get(`${getbaseURL}/`);
  },

  postUserProvinces: (infoprovin:any) => {
    return api.post(`${postbaseURL}/`,infoprovin);
  },
};
