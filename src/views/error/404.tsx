import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { HOME_URL } from "~@/config/constant";

const NotFound = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate(HOME_URL);
	};

	return (
		<Result
			className="h-full flex flex-col items-center justify-center"
			status={404}
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotFound;
