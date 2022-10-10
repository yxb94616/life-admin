import { useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import LoginForm from "./LoginForm";

function Login() {
	const [position, setPosition] = useState("center");
	const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
		setPosition(value);
	};

	const options = [
		{ label: "居左", value: "left" },
		{ label: "居中", value: "center" },
		{ label: "居右", value: "right" },
	];

	return (
		<div
			className={`login-wrapper pt-12 px-4 relative min-h-screen bg-no-repeat bg-cover bg-login
                 before:content-[' '] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
                 before:bg-black/20
      `}
		>
			<LoginForm position={position} />
			<div className="absolute top-5 left-8 z-50">
				<Radio.Group
					options={options}
					onChange={handlePositionChange}
					value={position}
					optionType="button"
					size="small"
				/>
			</div>
		</div>
	);
}

export default Login;
