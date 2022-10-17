import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { useSnapshot } from "valtio";
import AuthRouter from "./routers/utils/authRouter";
import Router from "./routers";
import { systemStore } from "./store/system";

ConfigProvider.config({
	theme: {
		primaryColor: import.meta.env.VITE_APP_COLOR,
	},
});

function App() {
	const { global } = useSnapshot(systemStore);

	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN} componentSize={global.size}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
