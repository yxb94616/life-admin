import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { IMenu } from "~@/api/interface/user";
import { addTabs, systemStore } from "~@/store/system";
import { userStore } from "~@/store/user";
import Logo from "./Logo";

type IMenuItem = Required<MenuProps>["items"][number];

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

// 动态渲染 Icon
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
	return React.createElement(customIcons[name]);
};

// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
const deepLoopFloat = (menus: IMenu[], newMenu: IMenuItem[] = []) => {
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

const getKeyPath = (path: string) => {
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

const LayoutMenu = () => {
	const { pathname } = useLocation();
	const [menuActive, setMenuActive] = useState(pathname);

	useEffect(() => {
		setMenuActive(pathname);
		if (!systemStore.global.isCollapse) {
			setOpenKeys(getKeyPath(pathname));
		}
	}, [pathname, systemStore.global]);

	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const onOpenChange = (keys: string[]) => {
		if (keys.length == 0) {
			setOpenKeys([]);
			return;
		}
		const path = keys[keys.length - 1];
		setOpenKeys(getKeyPath(path));
	};

	const [menuList, setMenuList] = useState<IMenuItem[]>([]);

	useEffect(() => {
		setMenuList(deepLoopFloat(userStore.menus));
	}, []);

	// 点击当前菜单跳转
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = (e) => {
		addTabs({
			title: (e.domEvent.target as HTMLElement).innerText,
			path: e.key,
		});
		navigate(e.key);
	};

	return (
		<div className="h-full menu">
			<Logo />
			<Menu
				items={menuList}
				selectedKeys={[menuActive]}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				onClick={clickMenu}
				theme="dark"
				mode="inline"
				triggerSubMenuAction="hover"
				className="h-omit-header overflow-x-hidden overflow-y-auto"
			/>
		</div>
	);
};

export default LayoutMenu;
