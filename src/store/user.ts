import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import { ILogin } from "~@/api/interface";
import constant from "~@/config/constant";

export const userStore = proxy<{ token: string | null; userinfo: ILogin.IUserinfo | null }>({
	token: localStorage.getItem(constant.storage.token) || null,
	userinfo: JSON.parse(localStorage.getItem(constant.storage.userinfo) || "null"),
});

if (import.meta.env.DEV) {
	devtools(userStore, { name: "userStore", enabled: true });
}

export const updateToken = (token: string | null) => {
	userStore.token = token;
	localStorage.setItem(constant.storage.token, JSON.stringify(token));
};

export const updateUserinfo = (userinfo: ILogin.IUserinfo | null) => {
	userStore.userinfo = userinfo;
	localStorage.setItem(constant.storage.userinfo, JSON.stringify(userinfo));
};
