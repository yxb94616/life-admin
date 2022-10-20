import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/taiwind.css";
import "antd/dist/antd.variable.min.css";
import "./styles/common.less";
import { Provider } from "jotai";
import App from "./App";
import { AtomsDevtools } from "./stores/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider>
			<AtomsDevtools>
				<App />
			</AtomsDevtools>
		</Provider>
	</React.StrictMode>,
);
