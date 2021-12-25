import api from ".";
const baseURL = "/person";
export const personApi = {
	createPerson: (personInfo: any) => {
	return api.post(`${baseURL}/create`, personInfo);
	},
};