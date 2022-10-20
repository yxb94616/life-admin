import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { HOME_URL } from "~@/config/constant";
import { home_tab, tabsAtom } from "~@/stores/theme";

enum MOREBTN {
	other = "other",
	all = "all",
}

const MoreButton = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [tabs, setTabs] = useAtom(tabsAtom);

	const onClick: MenuProps["onClick"] = ({ key }) => {
		if (key == MOREBTN.other) {
			if (pathname != HOME_URL) {
				const tab = tabs.find((item) => item.path == pathname);
				if (tab) {
					setTabs([home_tab, tab]);
				}
			} else {
				setTabs([home_tab]);
			}
		} else if (key == MOREBTN.all) {
			setTabs([home_tab]);
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
