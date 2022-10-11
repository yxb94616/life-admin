import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LazyLoad from "./lazyLoad";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />,
	},
	{
		path: "/login",
		element: LazyLoad(React.lazy(() => import("~@/views/login"))),
	},
	{
		element: LazyLoad(React.lazy(() => import("~@/layouts"))),
		children: [
			{
				path: "/home",
				element: LazyLoad(React.lazy(() => import("~@/views/home"))),
			},
			{
				path: "/store-demo",
				element: LazyLoad(React.lazy(() => import("~@/views/StoreDemo"))),
			},
			{
				path: "/dataScreen",
				element: LazyLoad(React.lazy(() => import("~@/views/dataScreen"))),
			},
			{
				path: "/table/useHooks",
				element: LazyLoad(React.lazy(() => import("~@/views/table/useHooks"))),
			},
			{
				path: "/table/useComponent",
				element: LazyLoad(React.lazy(() => import("~@/views/table/useComponent"))),
			},
			{
				path: "/dashboard/dataVisualize",
				element: LazyLoad(React.lazy(() => import("~@/views/dashboard/dataVisualize"))),
			},
			{
				path: "*",
				element: LazyLoad(React.lazy(() => import("~@/views/error/404"))),
			},
		],
	},
	{
		path: "/403",
		element: LazyLoad(React.lazy(() => import("~@/views/error/403"))),
	},
	{
		path: "/500",
		element: LazyLoad(React.lazy(() => import("~@/views/error/500"))),
	},
	{
		path: "*",
		element: LazyLoad(React.lazy(() => import("~@/views/error/404"))),
	},
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
