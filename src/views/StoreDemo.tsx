import { Button, ConfigProvider } from "antd";
import { useSnapshot } from "valtio";
import { systemStore } from "~@/store/system";
import Loading from "~@/components/Loading";

function StoreDemo() {
	const snap = useSnapshot(systemStore);
	const handleClick = () => {
		console.log(systemStore.count); // This is not recommended as it can be stale.
	};
	const handleChangeTheme = () => {
		ConfigProvider.config({
			theme: {
				primaryColor: "#f00",
			},
		});
	};

	return (
		<div className="space-x-4 h-screen">
			<button className="p-4 bg-primary rounded-2xl text-white" onClick={() => ++systemStore.count}>
				count is {snap.count}
			</button>
			<button className="p-4 bg-primary rounded-2xl text-white" onClick={handleClick}>
				count is {snap.count}
			</button>
			<Button
				type="primary"
				onClick={() => {
					handleChangeTheme();
				}}
			>
				change primary color of theme
			</Button>
			<Loading />
		</div>
	);
}

export default StoreDemo;
