import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { useAtom } from "jotai";
import AuthRouter from "./routers/utils/authRouter";
import Router from "./routers";
import { globalAtom } from "./stores/theme";

ConfigProvider.config({
	theme: {
		primaryColor: import.meta.env.VITE_APP_COLOR,
	},
});

function App() {
	const [global] = useAtom(globalAtom);

	useEffect(() => {
		if (global.isWeak) {
			document.documentElement.setAttribute("style", "filter: invert(80%)");
		} else {
			document.documentElement.removeAttribute("style");
		}
	}, [global.isWeak]);

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
