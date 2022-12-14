import { useAtom } from "jotai";
import logo from "~@/assets/images/logo.png";
import { globalAtom } from "~@/stores/theme";

const Logo = () => {
	const [global] = useAtom(globalAtom);

	return (
		<div className="h-header w-full flex items-center justify-center border-b border-b-[#000f1d]">
			<img src={logo} alt="logo" className="w-[29px]" />
			{!global.isCollapse ? (
				<h2 className="text-2xl font-bold text-[#dadada] whitespace-nowrap ml-2 mb-0">Life Admin</h2>
			) : null}
		</div>
	);
};

export default Logo;
