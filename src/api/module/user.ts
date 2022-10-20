import { http } from "../index";
import { Result, ResultData } from "../interface";
import { ICaptcha, ILoginReq, ILoginRes, IUpdatePasswordReq, IUserinfo } from "../interface/user";
import { API_CAPTCHA, API_LOGIN, API_PASSWORD, API_USERINFO } from "./urls";

export const getCaptcha = () => {
	return http.get<ResultData<ICaptcha>>(API_CAPTCHA);
};

export const LoginHttp = (params: ILoginReq) => {
	return http.post<ResultData<ILoginRes>>(API_LOGIN, params);
};

export const getUserinfo = () => {
	return http.get<ResultData<IUserinfo>>(API_USERINFO);
};

export const updatePassword = (params: IUpdatePasswordReq) => {
	return http.put<Result>(API_PASSWORD, params);
};
