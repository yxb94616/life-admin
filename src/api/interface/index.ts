// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	data: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace ILogin {
	export interface ILoginForm {
		username: string;
		password: string;
		code: string;
		remember: boolean;
	}
	export interface IUserinfo {
		id: string;
		username: string;
		nickname: string;
		token: string;
	}
}
