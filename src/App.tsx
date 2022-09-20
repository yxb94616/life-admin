import { proxy, ref, subscribe, useSnapshot } from "valtio";
import { devtools, subscribeKey, watch } from "valtio/utils";

const state = proxy({ count: 0, text: "hello", obj: { foo: "bar" }, dom: ref(document.body) });
devtools(state, { name: "state name", enabled: true });
// subscribe(state, () => console.log("state has changed to", state));
// subscribe(state.obj, () => console.log("state has changed to", state));
// state.obj.foo = "baz";

subscribeKey(state, "count", (v) => console.log("state.count has changed to", v));
watch((get) => {
	console.log("state has changed to", get(state)); // auto-subscribe on use
});

function App() {
	const snap = useSnapshot(state);
	const handleClick = () => {
		console.log(state.count); // This is not recommended as it can be stale.
	};

	return (
		<div className="space-x-4">
			<button className="p-4 bg-primary rounded-2xl" onClick={() => ++state.count}>
				count is {snap.count}
			</button>
			<button className="p-4 bg-primary rounded-2xl" onClick={handleClick}>
				count is {snap.count}
			</button>
		</div>
	);
}

export default App;
