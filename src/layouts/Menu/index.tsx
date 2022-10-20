import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import { useAtom } from "jotai";
import { ITabs } from "~@/stores/interface";
import { globalAtom, tabsAtom } from "~@/stores/theme";
import { userAtom } from "~@/stores/user";
import { deepLoopFloat, getKeyPath, IMenuItem } from "~@/utils";
import Logo from "./Logo";

const LayoutMenu = () => {
	const { pathname } = useLocation();
	const [menuActive, setMenuActive] = useState(pathname);
	const [global] = useAtom(globalAtom);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [sideMenus, setSideMenus] = useState<IMenuItem[]>([]);
	const [user] = useAtom(userAtom);
	const navigate = useNavigate();
	const [tabs, setTabs] = useAtom(tabsAtom);

	useEffect(() => {
		setMenuActive(pathname);
		if (!global.isCollapse) {
			setOpenKeys(getKeyPath(pathname));
		}
	}, [pathname, global.isCollapse]);

	useEffect(() => {
		setSideMenus(deepLoopFloat(user.menus));
	}, [user.menus]);

	const onOpenChange = (keys: string[]) => {
		if (keys.length == 0) {
			setOpenKeys([]);
			return;
		}
		const path = keys[keys.length - 1];
		setOpenKeys(getKeyPath(path));
	};

	// 点击当前菜单跳转
	const clickMenu: MenuProps["onClick"] = (e) => {
		const tab: ITabs = {
			title: (e.domEvent.target as HTMLElement).innerText,
			path: e.key,
		};
		const find = tabs.find((item) => item.path == tab.path);
		if (!find) {
			setTabs([...tabs, tab]);
		}
		navigate(e.key);
	};

	return (
		<div className="h-full menu">
			<Logo />
			<Menu
				items={sideMenus}
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
