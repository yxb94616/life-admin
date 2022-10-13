import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps, Spin } from "antd";
import * as Icons from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { IMenu } from "~@/api/interface";
import { getMenuListHttp } from "~@/api/module";
import { systemStore } from "~@/store/system";
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
	const { isCollapse } = useSnapshot(systemStore);

	useEffect(() => {
		setMenuActive(pathname);
		if (!isCollapse) {
			setOpenKeys(getKeyPath(pathname));
		}
	}, [pathname, isCollapse]);

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
	const [loading, setLoading] = useState(false);
	const getMenu = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuListHttp();
			if (data) {
				setMenuList(deepLoopFloat(data));
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	// 动态渲染 Icon
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: IMenu.IMenuOptions[], newArr: IMenuItem[] = []) => {
		menuList.forEach((item: IMenu.IMenuOptions) => {
			// 下面判断解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	// 点击当前菜单跳转
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		navigate(key);
	};

	return (
		<div className="h-full menu">
			<Spin spinning={loading}>
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
			</Spin>
		</div>
	);
};

export default LayoutMenu;
