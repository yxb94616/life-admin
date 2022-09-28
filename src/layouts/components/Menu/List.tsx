import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
	AppstoreOutlined,
	AreaChartOutlined,
	FileTextOutlined,
	FundOutlined,
	HomeOutlined,
	PieChartOutlined,
	ShoppingOutlined,
	TableOutlined,
} from "@ant-design/icons";
import { MenuOptions } from "~@/typings/global";

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

const _menu = [
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
		path: "/table",
		icon: <TableOutlined />,
		children: [
			{
				title: "使用 Hooks",
				path: "/table/useHooks",
			},
			{
				title: "使用 Component",
				path: "/table/useComponent",
				icon: <AppstoreOutlined />,
			},
		],
	},
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <FundOutlined />,
		children: [
			{
				path: "/dashboard/dataVisualize",
				title: "数据可视化",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/dashboard/embedded",
				title: "内嵌页面",
				icon: <AppstoreOutlined />,
			},
		],
	},
	{
		title: "表单 Form",
		path: "/form",
		icon: <FileTextOutlined />,
		children: [
			{
				path: "/form/basicForm",
				title: "基础 Form",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/form/validateForm",
				title: "校验 Form",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/form/dynamicForm",
				title: "动态 Form",
				icon: <AppstoreOutlined />,
			},
		],
	},
	{
		title: "Echarts",
		path: "/echarts",
		icon: <PieChartOutlined />,
		children: [
			{
				path: "/echarts/waterChart",
				title: "水型图",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/echarts/columnChart",
				title: "柱状图",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/echarts/lineChart",
				title: "折线图",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/echarts/pieChart",
				title: "饼图",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/echarts/radarChart",
				title: "雷达图",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/echarts/nestedChart",
				title: "嵌套环形图",
				icon: <AppstoreOutlined />,
			},
		],
	},
	{
		title: "常用组件",
		path: "/assembly",
		icon: <ShoppingOutlined />,
		children: [
			{
				path: "/assembly/selectIcon",
				title: "Icon 选择",
				icon: <AppstoreOutlined />,
			},
			{
				path: "/assembly/batchImport",
				title: "批量导入数据",
				icon: <AppstoreOutlined />,
			},
		],
	},
];

const List = handleMenu(_menu);

export default List;
