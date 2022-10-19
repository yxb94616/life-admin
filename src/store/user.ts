import { ref } from "valtio";
import { devtools, proxyWithComputed } from "valtio/utils";
import { toArrayTree } from "xe-utils";
import { IMenu, IUserinfo } from "~@/api/interface/user";
import constant from "~@/config/constant";
import { deepLoopFloat, IMenuItem } from "~@/utils";

interface IUser {
	token: string | null;
	userinfo: IUserinfo | null;
	menus: IMenu[];
	authorities: string[];
	roles: string[];
}

interface IUserComputed {
	sideMenus: IMenuItem[];
}

export const userStore = proxyWithComputed<IUser, IUserComputed>(
	{
		token: localStorage.getItem(constant.storage.token) || null,
		userinfo: null,
		menus: ref([]),
		authorities: [],
		roles: [],
	},
	{
		sideMenus: (snap) => deepLoopFloat(snap.menus as IMenu[]),
	},
);

if (import.meta.env.DEV) {
	devtools(userStore, { name: "userStore", enabled: true });
}

export const resetUserStore = () => {
	userStore.token = null;
	userStore.userinfo = null;
	userStore.menus = [];
	userStore.authorities = [];
	userStore.roles = [];
};

export const updateToken = (token: string) => {
	if (token) {
		userStore.token = token;
		localStorage.setItem(constant.storage.token, token);
	}
};

export const updateUserinfo = (userinfo: IUserinfo) => {
	userStore.userinfo = userinfo;

	const data = userinfo.authorities.filter((item) => item.menuType !== 1).filter((item) => item.hide === 0);
	const menus = toArrayTree(data, {
		key: "menuId",
		parentKey: "parentId",
		sortKey: "sortNumber",
	});

	// 有坑，这里数组不能直接赋值，可能是与引用类型嵌套层级太深有关系
	userStore.menus.splice(0, 100, ...menus);

	const authorities: string[] = [];
	for (let i = 0; i < userinfo.authorities.length; i++) {
		const item = userinfo.authorities[i];
		if (item.authority) {
			authorities.push(item.authority);
		}
	}
	userStore.authorities = authorities;

	userStore.roles = userinfo.roles.map((d) => d.roleCode) ?? [];
};
