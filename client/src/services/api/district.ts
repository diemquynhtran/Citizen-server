import api from ".";
const baseURL = "/district";
const postbaseURL = "/district/create"
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
};
