import { Spin } from "antd";

const Loading = ({ tip = "Loading..." }: { tip?: string }) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center pointer-events-none">
			<Spin size="large" tip={tip} />
		</div>
	);
};

export default Loading;
