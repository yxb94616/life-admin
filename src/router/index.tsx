import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LayoutIndex from "~@/layouts";
import Home from "~@/views/home";
import Login from "~@/views/login";
import StoreDemo from "~@/views/StoreDemo";
import NotFound from "~@/components/ErrorMessage/404";

const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <LayoutIndex name="我是参数" />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/store-demo",
				element: <StoreDemo />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
