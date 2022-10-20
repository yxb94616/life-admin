import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { globalAtom } from "~@/stores/theme";

const CollapseIcon = () => {
	const [global, setGlobal] = useAtom(globalAtom);

	return (
		<div
			className="mr-5 text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
			onClick={() => {
				setGlobal({ ...global, isCollapse: !global.isCollapse });
			}}
		>
			{global.isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default CollapseIcon;
