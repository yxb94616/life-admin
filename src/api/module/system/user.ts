import { http } from "~@/api";
import { ReqPage, ResPage } from "~@/api/interface";
import { IUserinfo } from "~@/api/interface/user";
import { API_SYSTEM_USER_PAGE } from "../urls";

export interface IPageUsersReq extends ReqPage {
	username?: string;
	nickname?: string;
	sex?: number;
}

export const pageUsers = (params: IPageUsersReq) => {
	return http.get<ResPage<IUserinfo>>(API_SYSTEM_USER_PAGE, params);
};
