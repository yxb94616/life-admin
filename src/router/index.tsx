import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LayoutIndex from "~@/layouts";
import DataVisualize from "~@/views/dashboard/dataVisualize";
import DataScreen from "~@/views/dataScreen";
import Home from "~@/views/home";
import Login from "~@/views/login";
import StoreDemo from "~@/views/StoreDemo";
import UseComponent from "~@/views/table/useComponent";
import UseHooks from "~@/views/table/useHooks";
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
		element: <LayoutIndex />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/store-demo",
				element: <StoreDemo />,
			},
			{
				path: "/dataScreen",
				element: <DataScreen />,
			},
			{
				path: "/table/useHooks",
				element: <UseHooks />,
			},
			{
				path: "/table/useComponent",
				element: <UseComponent />,
			},
			{
				path: "/dashboard/dataVisualize",
				element: <DataVisualize />,
			},
			{
				path: "*",
				element: <NotFound />,
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
