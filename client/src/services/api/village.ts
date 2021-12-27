import api from ".";
const baseURL = "/village";
const postbaseURL = "/village/create"
const putbaseURL = "/village/update";
const delbaseURL = "/village/delete";

export const villageApi = {
	getVillages: () => {
	return api.get(`${baseURL}/`);
	},
	
	getByRole: () => {
	return api.get(`${baseURL}/getByB1`);
	},
	
	getByWard: (wardCode: string) => {
	return api.post(`${baseURL}/getByWard`, {code:wardCode});
	},

	postVillage: (infovillage:any) => {
		return api.post(`${postbaseURL}/`,infovillage);
	  },
	putVillage: (infoput:any) => {
		return api.put(`${putbaseURL}/`,infoput);
	  },
	
	delVillage: (infodel:any) => {
		return api.delete(`${delbaseURL}/`,infodel);
	  },

};
