import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../utils/lazyLoad";

// dashboard 模块
const dashboardRouter: IRouteObject[] = [
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		meta: {
			title: "Dashboard",
			key: "dashboard",
		},
		children: [
			{
				path: "/dashboard/workplace",
				element: LazyLoad(React.lazy(() => import("~@/views/dashboard/dataVisualize"))),
				meta: {
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize",
				},
			},
			{
				path: "/dashboard/embedded",
				element: LazyLoad(React.lazy(() => import("~@/views/dashboard/embedded"))),
				meta: {
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded",
				},
			},
		],
	},
];

export default dashboardRouter;
