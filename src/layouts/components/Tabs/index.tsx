import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
		{
			title: "数据大屏",
			path: "/dataScreen",
		},
		{
			title: "使用 Hooks",
			path: "/table/useHooks",
		},
		{
			title: "使用 Component",
			path: "/table/useComponent",
		},
		{
			title: "数据可视化",
			path: "/dashboard/dataVisualize",
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
						<NavLink
							key={item.path}
							className={({ isActive }) => `flex items-center ${isActive ? "text-primary" : "text-neutral-500"}`}
							to={item.path}
						>
							{item.path == "/home" ? <HomeFilled /> : ""}
							{item.title}
						</NavLink>
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
