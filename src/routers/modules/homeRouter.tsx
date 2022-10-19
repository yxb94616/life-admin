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
					title: "首页",
					key: "home",
				},
			},
			{
				meta: {
					title: "系统管理",
					key: "system",
				},
				children: [
					{
						path: "/system/user",
						element: LazyLoad(React.lazy(() => import("~@/views/system/role"))),
						meta: {
							title: "用户管理",
							key: "user",
						},
					},
					{
						path: "/system/role",
						element: LazyLoad(React.lazy(() => import("~@/views/system/user"))),
						meta: {
							title: "角色管理",
							key: "role",
						},
					},
				],
			},
			{
				meta: {
					title: "组织管理",
					key: "org",
				},
				children: [
					{
						path: "/org/store",
						element: LazyLoad(React.lazy(() => import("~@/views/dashboard/dataVisualize"))),
						meta: {
							title: "门店管理",
							key: "store",
						},
					},
					{
						path: "/org/staff",
						element: LazyLoad(React.lazy(() => import("~@/views/dashboard/embedded"))),
						meta: {
							title: "员工管理",
							key: "staff",
						},
					},
				],
			},
		],
	},
];

export default homeRouter;
