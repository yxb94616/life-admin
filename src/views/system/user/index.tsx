import { DatePicker, Divider } from "antd";
import IconFont from "~@/components/IconFont";

const UseComponent = () => {
	return (
		<h1>
			useComponent
			<div className="bg-primary">
				<IconFont type="icon-file_music" style={{ fontSize: "4rem" }} />
			</div>
			<Divider />
			<DatePicker />
		</h1>
	);
};

export default UseComponent;
