import api from ".";
const baseURL = "/user/ward";
const postbaseURL = "/user/ward/create"
export const wardApi = {
	getUserWards: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByUserRole: () => {
	return api.get(`${baseURL}/getByA3`);
	},
	
	getByUserDistrict: (districtCode: string) => {
	return api.post(`${baseURL}/getByDistrict`, {code:districtCode});
	},

	postUserWard: (infoward:any) => {
		return api.post(`${postbaseURL}/`,infoward);
	  },
};
