import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";

const LayoutTabs = () => {
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState(pathname);
	const [tabsList] = useState([
		{
			title: "首页",
			path: "/home",
		},
	]);

	useEffect(() => {
		setActiveValue(pathname);
	}, [pathname]);

	const tabsClick = (path: string) => {
		console.log(path);
	};

	const delTabs = (path: string) => {
		console.log(path);
	};

	return (
		<Tabs
			items={tabsList.map((item) => {
				return {
					label: (
						<span key={item.path} className="flex items-center">
							{item.path == "/home" ? <HomeFilled /> : ""}
							{item.title}
						</span>
					),
					closable: item.path == "/home" ? false : true,
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
