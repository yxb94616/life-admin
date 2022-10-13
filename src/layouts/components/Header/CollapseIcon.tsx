import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { systemStore, updateCollapse } from "~@/store/system";

const CollapseIcon = () => {
	const { isCollapse } = useSnapshot(systemStore);

	return (
		<div
			className="mr-5 text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
			onClick={() => {
				updateCollapse();
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default CollapseIcon;
