import api from ".";
const baseURL = "/user";
export const userApi = {
	confirmComplete: (code: any) => {
		return api.post(`${baseURL}/confirmComplete`, {code: code});
	},
};
