import { message } from "antd";
import { CompressOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useFullscreen } from "ahooks";
import { systemStore } from "~@/store/system";

const Fullscreen = () => {
	const [isFullscreen, { toggleFullscreen, isEnabled }] = useFullscreen(systemStore.dom);

	const handleFullScreen = () => {
		if (!isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
		toggleFullscreen();
	};

	return (
		<>
			{isFullscreen ? (
				<CompressOutlined className="!text-[#626262] mr-5 text-xl cursor-pointer" onClick={handleFullScreen} />
			) : (
				<FullscreenOutlined className="!text-[#626262] mr-5 text-xl cursor-pointer" onClick={handleFullScreen} />
			)}
		</>
	);
};
export default Fullscreen;
