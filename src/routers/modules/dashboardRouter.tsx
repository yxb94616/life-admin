import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../lazyLoad";

// dashboard 模块
const dashboardRouter: IRouteObject[] = [
	{
		path: "/dashboard/dataVisualize",
		element: LazyLoad(React.lazy(() => import("~@/views/dashboard/dataVisualize"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "数据可视化",
			key: "dataVisualize",
		},
	},
	{
		path: "/dashboard/embedded",
		element: LazyLoad(React.lazy(() => import("~@/views/dashboard/embedded"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "内嵌页面",
			key: "embedded",
		},
	},
];

export default dashboardRouter;
