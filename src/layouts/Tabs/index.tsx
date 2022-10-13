import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { HOME_URL } from "~@/config/constant";
import { delTabs, systemStore } from "~@/store/system";
import MoreButton from "./MoreButton";

const LayoutTabs = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [activeValue, setActiveValue] = useState(pathname);
	const { tabs } = useSnapshot(systemStore);

	useEffect(() => {
		setActiveValue(pathname);
	}, [pathname]);

	const handleClickTabs = (path: string) => {
		navigate(path);
	};

	const handleDeleteTabs = (path: string) => {
		const previous = delTabs(path);
		if (path == pathname) {
			if (previous) {
				navigate(previous.path);
			}
		}
	};

	return (
		<Tabs
			animated
			items={tabs.map((item) => {
				return {
					label: (
						<span className="flex items-center">
							{item.path == HOME_URL ? <HomeFilled /> : ""}
							{item.title}
						</span>
					),
					closable: item.path == HOME_URL ? false : true,
					key: item.path,
				};
			})}
			activeKey={activeValue}
			onChange={handleClickTabs}
			hideAdd
			type="editable-card"
			className="main-tabs bg-white !px-3"
			onEdit={(path) => {
				handleDeleteTabs(path as string);
			}}
			tabBarExtraContent={<MoreButton />}
		></Tabs>
	);
};

export default LayoutTabs;
