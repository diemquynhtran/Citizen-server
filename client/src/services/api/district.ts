import api from ".";
const baseURL = "/district";
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
};
