import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { HOME_URL } from "~@/config/constant";
import LazyLoad from "./utils/lazyLoad";
import { IRouteObject } from "./interface";

// 导入所有 router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true });

interface IRouter {
	default: IRouteObject[];
}

// 处理路由
let routerArray: IRouteObject[] = [];
for (const path in metaRouters) {
	const router = metaRouters[path];
	routerArray = routerArray.concat((router as IRouter).default);
}

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
