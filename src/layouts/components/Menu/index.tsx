import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import List from "./List";
import Logo from "./Logo";

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
		setOpenKeys(getKeyPath(pathname));
	}, [pathname]);

	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const onOpenChange = (keys: string[]) => {
		if (keys.length == 0) {
			setOpenKeys([]);
			return;
		}
		const path = keys[keys.length - 1];
		setOpenKeys(getKeyPath(path));
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
