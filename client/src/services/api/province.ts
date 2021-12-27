import api from ".";
const getbaseURL = "/province";
const postbaseURL = "/province/create";
const putbaseURL = "/province/update";
const delbaseURL = "/province/delete";
export const provinceApi = {
  getProvinces: () => {
    return api.get(`${getbaseURL}/`);
  },

  postProvinces: (infoprovin:any) => {
    return api.post(`${postbaseURL}/`,infoprovin);
  },
  putProvince: (infoput:any) => {
    return api.put(`${putbaseURL}/`,infoput);
  },

  delProvince: (infodel:any) => {
    return api.delete(`${delbaseURL}/`,infodel);
  },
};
