import React from "react";
import { HOME_URL } from "~@/config/constant";
import { IRouteObject } from "~@/routers/interface";
import LazyLoad from "../utils/lazyLoad";

// 首页模块
const homeRouter: IRouteObject[] = [
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		children: [
			{
				path: HOME_URL,
				element: LazyLoad(React.lazy(() => import("~@/views/home"))),
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "home",
				},
			},
		],
	},
];

export default homeRouter;
