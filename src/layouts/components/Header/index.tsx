import { Layout } from "antd";
import AvatarIcon from "./AvatarIcon";
import BreadcrumbNav from "./BreadcrumbNav";
import CollapseIcon from "./CollapseIcon";
import Language from "./Language";
import Theme from "./Theme";

const { Header } = Layout;

const LayoutHeader = () => {
	return (
		<Header
			className={`flex items-center justify-between 
								!bg-white !h-header !pr-10 !pl-5 border-b border-b-neutral-100`}
		>
			<div className="flex items-center">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="flex items-center">
				<Language />
				<Theme />
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
