import logo from "../../../assets/images/logo.png";

const Logo = () => {
	return (
		<div className="h-header w-full flex items-center justify-center border-b border-b-[#000f1d]">
			<img src={logo} alt="logo" className="w-[29px]" />
			<h2 className="text-2xl font-bold text-[#dadada] whitespace-normal ml-2 mb-0">Life Admin</h2>
		</div>
	);
};

export default Logo;
