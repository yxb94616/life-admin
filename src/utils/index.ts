import React from "react";
import { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { IMenu } from "~@/api/interface/user";

export type IMenuItem = Required<MenuProps>["items"][number];

const getItem = (
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: IMenuItem[],
	type?: "group",
): IMenuItem => {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as IMenuItem;
};

const customIcons: { [key: string]: any } = Icons;
/** 动态渲染 Icon */
const addIcon = (name: string) => {
	return React.createElement(customIcons[name]);
};

/** 处理后台返回菜单为侧边菜单所需结构 */
export const deepLoopFloat = (menus: IMenu[], newMenu: IMenuItem[] = []) => {
	menus.forEach((item: IMenu) => {
		if (!item.children?.length) {
			return newMenu.push(getItem(item.title, item.path, addIcon("AppstoreOutlined")));
		}
		if (item.children && item.children.length > 0) {
			newMenu.push(getItem(item.title, item.path, addIcon("TableOutlined"), deepLoopFloat(item.children)));
		}
	});
	return newMenu;
};

/**
 * 将路由 pathname 切割，逐级累加字符串，
 * 比如 /a/b/c 处理为 ["/a","/a/b","/a/b/c"]
 */
export const getKeyPath = (path: string) => {
	let str = "";
	const arr = path
		.split("/")
		.slice(1)
		.map((item) => "/" + item)
		.map((item) => {
			return (str += item).replace(/\/\//g, "/");
		});

	return arr;
};
