import { Button } from "antd";
import { useSnapshot } from "valtio";
import { systemStore } from "~@/store/system";

function StoreDemo() {
	const snap = useSnapshot(systemStore);
	const handleClick = () => {
		console.log(systemStore.count); // This is not recommended as it can be stale.
	};

	return (
		<div className="space-x-4">
			<button className="p-4 bg-primary rounded-2xl" onClick={() => ++systemStore.count}>
				count is {snap.count}
			</button>
			<button className="p-4 bg-primary rounded-2xl" onClick={handleClick}>
				count is {snap.count}
			</button>
			<Button type="primary">button</Button>
		</div>
	);
}

export default StoreDemo;
