import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useSnapshot } from "valtio";
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
		<ConfigProvider componentSize={global.size}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
