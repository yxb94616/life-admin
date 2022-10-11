import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common.less";
import "./styles/taiwind.css";
import "antd/dist/antd.variable.min.css";
import { ConfigProvider } from "antd";
import mock from "../mock/index";
import App from "./App";

if (import.meta.env.DEV) {
	mock();
}

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
