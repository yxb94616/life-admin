import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../utils/lazyLoad";

// 超级表格模块
const proTableRouter: IRouteObject[] = [
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		meta: {
			title: "超级表格",
			key: "proTable",
		},
		children: [
			{
				path: "/proTable/useHooks",
				element: LazyLoad(React.lazy(() => import("~@/views/proTable/useHooks"))),
				meta: {
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks",
				},
			},
			{
				path: "/proTable/useComponent",
				element: LazyLoad(React.lazy(() => import("~@/views/proTable/useComponent"))),
				meta: {
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent",
				},
			},
		],
	},
];

export default proTableRouter;
