import http from "~@/api";
import { ILogin } from "../interface";

export const API_LOGIN = "/login";

export const LoginHttp = (params: ILogin.ILoginForm) => {
	return http.post<ILogin.IUserinfo>(API_LOGIN, params);
};
