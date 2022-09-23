import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import LayoutFooter from "./components/Footer";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import LayoutTabs from "./components/Tabs";

const { Sider, Content } = Layout;

const LayoutIndex = (props: { name: string }) => {
	console.log(props);

	const { pathname } = useLocation();
	const nodeRef = useRef(null);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={false} width={220}>
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader />
				<LayoutTabs />
				<Content>
					<TransitionGroup className="container">
						<CSSTransition nodeRef={nodeRef} key={pathname} timeout={200} className="fade" exit={false}>
							<div ref={nodeRef}>
								<Outlet />
							</div>
						</CSSTransition>
					</TransitionGroup>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</Layout>
	);
};

export default LayoutIndex;
