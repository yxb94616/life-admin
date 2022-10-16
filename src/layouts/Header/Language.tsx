import { Dropdown, Menu } from "antd";
import { TranslationOutlined } from "@ant-design/icons";

const Language = () => {
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span>简体中文</span>,
				},
				{
					key: "2",
					label: <span>English</span>,
				},
			]}
		/>
	);

	return (
		<Dropdown placement="bottom" trigger={["click"]} arrow overlay={menu}>
			<TranslationOutlined className="mr-5 text-xl cursor-pointer" />
		</Dropdown>
	);
};
export default Language;
