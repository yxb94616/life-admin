import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { HOME_URL } from "~@/config/constant";
import { IRouteObject } from "./interface";
import LazyLoad from "./lazyLoad";

// 导入所有 router
const metaRouters = import.meta.glob("./modules/*.tsx");

interface IRouter {
	default: IRouteObject[];
}

// 处理路由
const getRouterArray = async () => {
	let routers: IRouteObject[] = [];
	for (const path in metaRouters) {
		const router = await metaRouters[path]();
		routers = routers.concat((router as IRouter).default);
	}
	return routers;
};

const routerArray = await getRouterArray();

const routes: IRouteObject[] = [
	{
		path: "/",
		element: <Navigate to={HOME_URL} />,
	},
	{
		path: "/login",
		element: LazyLoad(React.lazy(() => import("~@/views/login"))),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login",
		},
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
];

const Router = () => {
	return useRoutes(routes);
};

export { routes };

export default Router;
