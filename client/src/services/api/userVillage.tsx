import api from ".";
const baseURL = "/user/village";
const postbaseURL = "/user/village/create"
export const uservillageApi = {
	getUserVillages: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByUserRole: () => {
	return api.get(`${baseURL}/getByB1`);
	},
	
	getByUserWard: (wardCode: string) => {
	return api.post(`${baseURL}/getByWard`, {code:wardCode});
	},

	postUserVillage: (infovillage:any) => {
		return api.post(`${postbaseURL}/`,infovillage);
	  },

};
