import api from ".";
const baseURL = "/village";
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

};
