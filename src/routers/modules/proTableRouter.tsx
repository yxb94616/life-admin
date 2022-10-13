import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../lazyLoad";

// 超级表格模块
const proTableRouter: IRouteObject[] = [
	{
		path: "/proTable/useHooks",
		element: LazyLoad(React.lazy(() => import("~@/views/proTable/useHooks"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "使用 Hooks",
			key: "useHooks",
		},
	},
	{
		path: "/proTable/useComponent",
		element: LazyLoad(React.lazy(() => import("~@/views/proTable/useComponent"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "使用 Component",
			key: "useComponent",
		},
	},
];

export default proTableRouter;
