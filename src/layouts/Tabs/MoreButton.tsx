import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { HOME_URL } from "~@/config/constant";
import { closeMultipleTabs } from "~@/store/system";

enum MOREBTN {
	other = "other",
	all = "all",
}

const MoreButton = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		if (key == MOREBTN.other) {
			closeMultipleTabs(pathname);
		} else if (key == MOREBTN.all) {
			closeMultipleTabs();
			navigate(HOME_URL);
		}
	};

	const menu = (
		<Menu
			onClick={onClick}
			items={[
				{
					key: MOREBTN.other,
					label: "关闭其它",
				},
				{
					key: MOREBTN.all,
					label: "关闭所有",
				},
			]}
		/>
	);

	return (
		<Dropdown overlay={menu} arrow placement="bottom">
			<Button type="primary" size="small" className="!flex items-center justify-center">
				更多 <DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default MoreButton;
