import { matchRoutes, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { routes } from "~@/routers";

const BreadcrumbNav = () => {
	const location = useLocation();
	const match = matchRoutes(routes, location);

	return (
		<Breadcrumb>
			{match?.map((item) => {
				return item.route.meta?.title && <Breadcrumb.Item key={item.pathname}>{item.route.meta.title}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

export default BreadcrumbNav;
