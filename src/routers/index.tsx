import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useAtom } from "jotai";
import { IMenu } from "~@/api/interface/user";
import { HOME_URL } from "~@/config/constant";
import { userAtom } from "~@/stores/user";
import LazyLoad from "./utils/lazyLoad";
import { IRouteObject } from "./interface";

// 按菜单路径导入所有 router
const lazyRoutes: Record<string, any> = {
	"/system/user": LazyLoad(React.lazy(() => import("~@/views/system/user"))),
	"/system/role": LazyLoad(React.lazy(() => import("~@/views/system/role"))),
	"/dashboard/dataVisualize": LazyLoad(React.lazy(() => import("~@/views/dashboard/dataVisualize"))),
};

const homeRoute: IRouteObject = {
	path: HOME_URL,
	element: LazyLoad(React.lazy(() => import("~@/views/home"))),
	meta: {
		title: "首页",
		key: "home",
	},
};

export const initRoutes: IRouteObject[] = [
	{
		path: "/",
		element: <Navigate to={HOME_URL} />,
	},
	{
		path: "/login",
		element: LazyLoad(React.lazy(() => import("~@/views/login"))),
		meta: {
			title: "登录页",
			key: "login",
		},
	},
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		children: [homeRoute],
	},
	{
		path: "*",
		element: LazyLoad(React.lazy(() => import("~@/views/error/404"))),
	},
];

const generateRoutes = (menus: IMenu[], newRoutes: IRouteObject[] = []) => {
	for (let i = 0; i < menus.length; i++) {
		const item = menus[i];
		if (item.hide === 0) {
			const meta = {
				title: item.title,
				key: item.menuId.toString(),
			};
			if (item.children && item.children.length > 0) {
				const child = generateRoutes(item.children);
				const r: IRouteObject = {
					meta,
					children: child,
				};
				newRoutes.push(r);
			} else if (item.component && item.path && Object.hasOwn(lazyRoutes, item.path)) {
				const r: IRouteObject = {
					meta,
					path: item.path,
					element: lazyRoutes[item.path],
				};
				newRoutes.push(r);
			}
		}
	}

	return newRoutes;
};

const Router = () => {
	const [routers, setRouters] = useState(initRoutes);
	const [user] = useAtom(userAtom);

	useEffect(() => {
		const genRoutes = generateRoutes(user.menus);
		initRoutes[2].children = [homeRoute, ...genRoutes];
		setRouters(initRoutes);
	}, [user.menus]);

	return useRoutes(routers);
};

export default Router;
