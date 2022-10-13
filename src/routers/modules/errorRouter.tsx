import React from "react";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../lazyLoad";

// 错误页面模块
const errorRouter: IRouteObject[] = [
	{
		path: "/403",
		element: LazyLoad(React.lazy(() => import("~@/views/error/403"))),
		meta: {
			requiresAuth: true,
			title: "403页面",
			key: "403",
		},
	},
	{
		path: "/404",
		element: LazyLoad(React.lazy(() => import("~@/views/error/404"))),
		meta: {
			requiresAuth: false,
			title: "404页面",
			key: "404",
		},
	},
	{
		path: "/500",
		element: LazyLoad(React.lazy(() => import("~@/views/error/500"))),
		meta: {
			requiresAuth: false,
			title: "500页面",
			key: "500",
		},
	},
];

export default errorRouter;
