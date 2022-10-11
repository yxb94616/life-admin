import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { HOME_URL } from "~@/config/constant";

const LayoutTabs = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [activeValue, setActiveValue] = useState(pathname);
	const [tabsList] = useState([
		{
			title: "首页",
			path: HOME_URL,
		},
	]);

	useEffect(() => {
		setActiveValue(pathname);
	}, [pathname]);

	const tabsClick = (path: string) => {
		navigate(path);
	};

	const delTabs = (path: string) => {
		console.log(path);
	};
	return (
		<Tabs
			animated
			items={tabsList.map((item) => {
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
			onChange={tabsClick}
			hideAdd
			type="editable-card"
			className="main-tabs bg-white !px-3"
			onEdit={(path) => {
				delTabs(path as string);
			}}
		></Tabs>
	);
};

export default LayoutTabs;
