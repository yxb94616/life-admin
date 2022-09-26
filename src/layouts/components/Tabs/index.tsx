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
		{
			title: "超级表格",
			path: "/proTable",
		},
		{
			title: "数据大屏",
			path: "/dataScreen",
		},
		{
			title: "使用 Hooks",
			path: "/useHooks",
		},
		{
			title: "使用 Component",
			path: "/useComponent",
		},
		{
			title: "数据可视化",
			path: "/dashboard",
		},
		{
			title: "内嵌页面",
			path: "/embedded",
		},
		{
			title: "基础 Form",
			path: "/basicForm",
		},
		{
			title: "校验 Form",
			path: "/validateForm",
		},
		{
			title: "动态 Form",
			path: "/dynamicForm",
		},
		{
			title: "水型图",
			path: "/waterChart",
		},
		{
			title: "柱状图",
			path: "/columnChart",
		},
		{
			title: "折线图",
			path: "/超级表格",
		},
		{
			title: "雷达图",
			path: "/radarChart",
		},
		{
			title: "嵌套环形图",
			path: "/nestedChart",
		},
		{
			title: "折线图",
			path: "/超级表格1",
		},
		{
			title: "雷达图",
			path: "/radarChart1",
		},
		{
			title: "嵌套环形图",
			path: "/nestedChart1",
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
					key: item.path,
				};
			})}
			activeKey={activeValue}
			onChange={tabsClick}
			hideAdd
			type="editable-card"
			className="main-tabs bg-white px-3"
			onEdit={(path) => {
				delTabs(path as string);
			}}
		></Tabs>
	);
};

export default LayoutTabs;
