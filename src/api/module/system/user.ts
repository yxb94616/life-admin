import { http } from "~@/api";
import { ReqPage, ResPage, Result } from "~@/api/interface";
import { IUpdateUserPasswordRes, IUpdateUserStatusRes, IUserinfo } from "~@/api/interface/user";
import { API_SYSTEM_USER_PAGE, API_SYSTEM_USER_PASSWORD, API_SYSTEM_USER_STATUS } from "../urls";

export interface IPageUsersReq extends ReqPage {
	username?: string;
	nickname?: string;
	sex?: number;
}

export const pageUsers = (params: IPageUsersReq) => {
	return http.get<ResPage<IUserinfo>>(API_SYSTEM_USER_PAGE, params);
};

export const updateUserStatus = (params: IUpdateUserStatusRes) => {
	return http.put<Result>(API_SYSTEM_USER_STATUS, params);
};

export const updateUserPassword = (params: IUpdateUserPasswordRes) => {
	return http.put<Result>(API_SYSTEM_USER_PASSWORD, params);
};
