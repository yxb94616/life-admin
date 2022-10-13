import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useSnapshot } from "valtio";
import { systemStore } from "~@/store/system";
import LayoutFooter from "./components/Footer";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import LayoutTabs from "./components/Tabs";

const { Sider, Content } = Layout;

const LayoutIndex = () => {
	const { isCollapse } = useSnapshot(systemStore);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={isCollapse} width={220} className="left-sider">
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader />
				<LayoutTabs />
				<Content className="my-2 mx-3 bg-white p-5 shadow rounded overflow-auto overflow-x-hidden">
					<Outlet />
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</Layout>
	);
};

export default LayoutIndex;
