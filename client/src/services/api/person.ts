import api from ".";
const baseURL = "/person";
export const personApi = {
	createPerson: (personInfo: any) => {
		return api.post(`${baseURL}/create`, personInfo);
	},
	
	getByRole: () => {
		return api.get(`${baseURL}/getByRole`);
	},
	
	getByReq: (code: any) => {
		return api.post(`${baseURL}//getByRequest`, code);

	},

};
