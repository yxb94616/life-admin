import { IDBRecord, ReqPage } from ".";

export interface ICaptcha {
	base64: string;
	text: string;
}

export interface ILoginReq {
	username: string;
	password: string;
	code: string;
	remember: boolean;
	tenantId: number;
}

export interface IUserinfo extends IDBRecord {
	userId: number;
	username: string;
	nickname: string;
	avatar: string;
	sex: number;
	phone: string;
	email: string;
	emailVerified: number;
	realName: string;
	idCard: string;
	birthday: string;
	introduction: string;
	organizationId: number;
	status: number;
	authorities: IMenu[];
	roles: IRole[];
}

export interface IMenu extends IDBRecord {
	menuId: number;
	parentId: number;
	title: string;
	path?: string;
	component?: string;
	menuType: number;
	sortNumber: number;
	authority?: string;
	icon?: string;
	hide: number;
	meta?: string;
	children?: IMenu[];
}

export interface IRole extends IDBRecord {
	roleId: number;
	roleName: string;
	roleCode: string;
	comments?: string;
}

export interface ILoginRes {
	access_token: string;
	user: IUserinfo;
}

export interface IUpdatePasswordReq {
	oldPassword: string;
	password: string;
	password2: string;
}

export interface IPageUsersSearch {
	username?: string;
	nickname?: string;
	sex?: number;
}

export type IPageUsersReq = IPageUsersSearch & ReqPage;

export interface IUpdateUserStatusRes {
	userId: number;
	status: number;
}

export interface IUpdateUserPasswordRes {
	userId: number;
}
