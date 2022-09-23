import { Layout } from "antd";
import AvatarIcon from "./AvatarIcon";
import BreadcrumbNav from "./BreadcrumbNav";
import CollapseIcon from "./CollapseIcon";

const { Header } = Layout;

const LayoutHeader = () => {
	return (
		<Header className="flex items-center justify-between !bg-white !h-header !pr-10 !pl-5">
			<div className="flex items-center">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
