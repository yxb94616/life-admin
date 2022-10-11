import http from "~@/api";
import { ILogin, IMenu } from "../interface";

export const API_LOGIN = "/login";

export const LoginHttp = (params: ILogin.ILoginForm) => {
	return http.post<ILogin.IUserinfo>(API_LOGIN, params);
};

export const API_MENU_LIST = "/getMenuList";

export const getMenuListHttp = () => {
	return http.get<IMenu.IMenuOptions[]>(API_MENU_LIST);
};
