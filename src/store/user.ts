import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import { ILogin } from "~@/api/interface";
import constant from "~@/config/constant";

export const userStore = proxy<{ token: string | null; userinfo: ILogin.IUserinfo | null }>({
	token: localStorage.getItem(constant.storage.token),
	userinfo: JSON.parse(localStorage.getItem(constant.storage.userinfo) || "null"),
});

devtools(userStore, { name: "userStore", enabled: true });
