import { http } from "~@/api";
import { ResPage, Result } from "~@/api/interface";
import { IPageUsersReq, IUpdateUserPasswordRes, IUpdateUserStatusRes, IUserinfo } from "~@/api/interface/user";
import { API_SYSTEM_USER_PAGE, API_SYSTEM_USER_PASSWORD, API_SYSTEM_USER_STATUS } from "../urls";

export const pageUsers = (params: IPageUsersReq) => {
	return http.get<ResPage<IUserinfo>>(API_SYSTEM_USER_PAGE, params);
};

export const updateUserStatus = (params: IUpdateUserStatusRes) => {
	return http.put<Result>(API_SYSTEM_USER_STATUS, params);
};

export const updateUserPassword = (params: IUpdateUserPasswordRes) => {
	return http.put<Result>(API_SYSTEM_USER_PASSWORD, params);
};
