import { Layout } from "antd";

const { Footer } = Layout;

const LayoutFooter = () => {
	return (
		<Footer className="h-8 !bg-white border-t border-t-[#e4e7ed] flex items-center justify-center">
			<a
				href="https://yxb94616.github.io/"
				target="_blank"
				rel="noreferrer"
				className="text-sm tracking-wide text-[#858585] no-underline whitespace-nowrap"
			>
				2022 © Life-Admin By Hooks Technology.
			</a>
		</Footer>
	);
};

export default LayoutFooter;
