import { Spin } from "antd";

const Loading = ({ tip = "Loading..." }: { tip?: string }) => {
	return <Spin size="large" tip={tip} />;
};

export default Loading;
