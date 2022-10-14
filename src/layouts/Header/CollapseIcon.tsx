import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import { systemStore, updateGlobalConfig } from "~@/store/system";

const CollapseIcon = () => {
	const { global } = useSnapshot(systemStore);

	return (
		<div
			className="mr-5 text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
			onClick={() => {
				updateGlobalConfig({
					isCollapse: !global.isCollapse,
				});
			}}
		>
			{global.isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default CollapseIcon;
