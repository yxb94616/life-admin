import { Button, ConfigProvider, DatePicker, Divider } from "antd";
import IconFont from "~@/components/IconFont";

const UseComponent = () => {
	const handleChangeTheme = () => {
		ConfigProvider.config({
			theme: {
				primaryColor: "#f00",
			},
		});
	};

	return (
		<h1>
			useComponent
			<div>
				<IconFont type="icon-file_music" style={{ fontSize: "4rem" }} />
			</div>
			<Button
				type="primary"
				onClick={() => {
					handleChangeTheme();
				}}
			>
				change primary color of theme
			</Button>
			<Divider />
			<DatePicker />
		</h1>
	);
};

export default UseComponent;
