import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common.less";
import "./styles/taiwind.css";
import "antd/dist/antd.variable.min.css";
import { ConfigProvider } from "antd";
import App from "./App";

ConfigProvider.config({
	theme: {
		primaryColor: "#3369e7",
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
);
