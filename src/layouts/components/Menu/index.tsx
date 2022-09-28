import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import List from "./List";
import Logo from "./Logo";

const getOpenKeys = (path: string) => {
	let str = "";
	const arr = path
		.split("/")
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
		setOpenKeys(getOpenKeys(pathname));
	}, [pathname]);

	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const onOpenChange = (keys: string[]) => {
		setOpenKeys([keys[keys.length - 1]]);
	};

	return (
		<div className="h-full">
			<Logo />
			<Menu
				items={List}
				selectedKeys={[menuActive]}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				theme="dark"
				mode="inline"
				triggerSubMenuAction="click"
				className="h-omit-header overflow-auto"
			/>
		</div>
	);
};

export default LayoutMenu;
