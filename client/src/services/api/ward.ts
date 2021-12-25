import api from ".";
const baseURL = "/ward";
export const wardApi = {
	getWards: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByRole: () => {
	return api.get(`${baseURL}/getByA3`);
	},
	
	getByDistrict: (districtCode: string) => {
	return api.post(`${baseURL}/getByDistrict`, {code:districtCode});
	},

};
