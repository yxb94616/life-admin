import React from "react";
import { HOME_URL } from "~@/config/constant";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../lazyLoad";

// 首页模块
const homeRouter: IRouteObject[] = [
	{
		path: HOME_URL,
		element: LazyLoad(React.lazy(() => import("~@/views/home"))),
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: "首页",
			key: "home",
		},
	},
];

export default homeRouter;
