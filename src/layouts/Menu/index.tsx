import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import { useSnapshot } from "valtio";
import { addTabs, systemStore } from "~@/store/system";
import { userStore } from "~@/store/user";
import { getKeyPath, IMenuItem } from "~@/utils";
import Logo from "./Logo";

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

	const snap = useSnapshot(userStore);

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
				items={snap.sideMenus as IMenuItem[]}
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
