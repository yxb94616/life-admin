import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useAtom } from "jotai";
import { globalAtom } from "~@/stores/theme";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";
import LayoutMenu from "./Menu";
import LayoutTabs from "./Tabs";

const { Sider, Content } = Layout;

const LayoutIndex = () => {
	const [global] = useAtom(globalAtom);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={global.isCollapse} width={220} className="left-sider">
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader />
				{global.isTabs && <LayoutTabs />}
				<Content className="my-2 mx-3 bg-white p-5 shadow rounded overflow-auto overflow-x-hidden">
					<Outlet />
				</Content>
				{global.isFooter && <LayoutFooter />}
			</Layout>
		</Layout>
	);
};

export default LayoutIndex;
