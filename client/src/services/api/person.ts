import api from ".";
const baseURL = "/person";
export const personApi = {

	

	
	getByReq: (code: any) => {
		return api.post(`${baseURL}//getByRequest`, code);

	},

  createPerson: (personInfo: any) => {
    return api.post(`${baseURL}/create`, personInfo);
  },

  getByRole: () => {
    return api.get(`${baseURL}/getByRole`);
  },
  analyticByGender: (code: string) => {
    return api.post(`${baseURL}/analytics/gender`, { code });
  },
  analyticByAge: (code: string) => {
    return api.post(`${baseURL}/analytics/age`, { code });
  },
  
};
