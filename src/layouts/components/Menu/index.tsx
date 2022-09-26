import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { AreaChartOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import { MenuOptions } from "~@/typings/global";
import Logo from "./Logo";

interface IMenuItem {
	label: ReactNode;
	key: string;
	icon: ReactNode;
	children?: IMenuItem[];
}

const handleMenu = (menu: MenuOptions[]) => {
	const data: IMenuItem[] = [];
	for (let i = 0; i < menu.length; i++) {
		const item = menu[i];
		const obj: IMenuItem = {
			label: <Link to={item.path}>{item.title}</Link>,
			key: item.path,
			icon: item.icon,
		};
		if (item.children && item.children.length > 0) {
			obj.label = item.title;
			obj.children = handleMenu(item.children);
		}
		data.push(obj);
	}
	return data;
};

const LayoutMenu = () => {
	const { pathname } = useLocation();
	const [menuActive, setMenuActive] = useState(pathname);

	const _menu = handleMenu([
		{
			title: "首页",
			path: "/home",
			icon: <HomeOutlined />,
		},
		{
			title: "数据大屏",
			path: "/dataScreen",
			icon: <AreaChartOutlined />,
		},
		{
			title: "store",
			path: "/store-demo",
			icon: <AreaChartOutlined />,
		},
		{
			title: "超级表格",
			path: "/proTable",
			icon: <TableOutlined />,
			children: [
				{
					title: "使用 Hooks",
					path: "/table/useHooks",
				},
			],
		},
	]);
	const [menuList] = useState(_menu);

	useEffect(() => {
		setMenuActive(pathname);
	}, [pathname]);

	return (
		<div className="h-full">
			<Logo />
			<Menu
				items={menuList}
				selectedKeys={[menuActive]}
				theme="dark"
				mode="inline"
				triggerSubMenuAction="click"
				className="h-omit-header overflow-auto"
			/>
		</div>
	);
};

export default LayoutMenu;
