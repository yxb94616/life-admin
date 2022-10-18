import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../utils/lazyLoad";

// 超级表格模块
const proTableRouter: IRouteObject[] = [
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		meta: {
			title: "超级表格",
			key: "system",
		},
		children: [
			{
				path: "/system/user",
				element: LazyLoad(React.lazy(() => import("~@/views/proTable/useHooks"))),
				meta: {
					requiresAuth: true,
					title: "用户管理",
					key: "user",
				},
			},
			{
				path: "/system/role",
				element: LazyLoad(React.lazy(() => import("~@/views/proTable/useComponent"))),
				meta: {
					requiresAuth: true,
					title: "角色管理",
					key: "role",
				},
			},
		],
	},
];

export default proTableRouter;
