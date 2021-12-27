import api from ".";
const baseURL = "/district";
const postbaseURL = "/district/create"
const putbaseURL = "/district/update";
const delbaseURL = "/district/delete";

export const districtApi = {
	getDistricts: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByRole: () => {
	return api.get(`${baseURL}/getByRole`);
	},

	getByProvince: (provinceCode: string) => {
	return api.post(`${baseURL}/getByProvince`, {code:provinceCode});
	},

	postDistrict: (infodistrict:any) => {
		return api.post(`${postbaseURL}/`,infodistrict);
	  },
	putDistrict: (infoput:any) => {
		return api.put(`${putbaseURL}/`,infoput);
	  },
	
	delDistrict: (infodel:any) => {
		return api.delete(`${delbaseURL}/`,infodel);
	  },
};
