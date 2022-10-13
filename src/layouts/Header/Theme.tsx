import { useState } from "react";
import { Drawer } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const Theme = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<SettingOutlined
				className="!text-[#626262] mr-5 text-xl cursor-pointer"
				onClick={() => {
					setVisible(!visible);
				}}
			/>
			<Drawer
				title="设置"
				closable={false}
				open={visible}
				onClose={() => {
					setVisible(!visible);
				}}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};
export default Theme;
