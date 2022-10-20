import { atomWithReset, atomWithStorage } from "jotai/utils";
import { toArrayTree } from "xe-utils";
import { IMenu, IUserinfo } from "~@/api/interface/user";
import constant from "~@/config/constant";

interface IUser {
	info: IUserinfo | null;
	menus: IMenu[];
	authorities: string[];
	roles: string[];
}

export const tokenAtom = atomWithStorage(constant.storage.token, "");

export const userAtom = atomWithReset<IUser>({
	info: null,
	menus: [],
	authorities: [],
	roles: [],
});

export const handleUserinfo = (userinfo: IUserinfo) => {
	const validMenus = userinfo.authorities.filter((item) => item.menuType !== 1).filter((item) => item.hide === 0);
	const menus = toArrayTree(validMenus, {
		key: "menuId",
		parentKey: "parentId",
		sortKey: "sortNumber",
	});

	const authorities: string[] = [];
	for (let i = 0; i < userinfo.authorities.length; i++) {
		const item = userinfo.authorities[i];
		if (item.authority) {
			authorities.push(item.authority);
		}
	}

	const roles = userinfo.roles.map((d) => d.roleCode) ?? [];

	return { menus, authorities, roles };
};
