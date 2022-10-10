import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import constant from "~@/config/constant";
import { IUserinfo } from "~@/typings/user";

export const userStore = proxy<{ token: string | null; userinfo: IUserinfo | null }>({
	token: localStorage.getItem(constant.storage.token),
	userinfo: JSON.parse(localStorage.getItem(constant.storage.userinfo) || "null"),
});

devtools(userStore, { name: "userStore", enabled: true });
