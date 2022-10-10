/**
 * @description 登录表单
 */
export interface ILoginForm {
	username: string;
	password: string;
	code: string;
	remember: boolean;
}

/**
 * @description 用户信息
 */
export interface IUserinfo {
	id: string;
	username: string;
	nickname: string;
	token: string;
}
