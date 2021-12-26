import api from ".";
const baseURL = "/user/district";
const postbaseURL = "/user/district/create"

export const userdistrictApi = {

	getUserDistricts: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByUserRole: () => {
	return api.get(`${baseURL}/getByRole`);
	},

	getByUserProvince: (provinceCode: string) => {
	return api.post(`${baseURL}/getByProvince`, {code:provinceCode});
	},

	postUserDistrict: (infodistrict:any) => {
		return api.post(`${postbaseURL}/`,infodistrict);
	  },
};