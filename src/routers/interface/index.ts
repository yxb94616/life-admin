import { RouteObject } from "react-router-dom";

export interface MetaProps {
	requiresAuth?: boolean;
	title: string;
	key?: string;
}

export type IRouteObject = RouteObject & {
	children?: IRouteObject;
	meta?: MetaProps;
	isLink?: string;
};
