import { proxy, ref } from "valtio";
import { devtools } from "valtio/utils";

export const systemStore = proxy({ count: 0, text: "hello", obj: { foo: "bar" }, dom: ref(document.body) });

if (import.meta.env.DEV) {
	devtools(systemStore, { name: "systemStore", enabled: true });
}

// export const systemSub = subscribe(systemStore, () => console.log("state has changed to", systemStore));
// export const unSystemSubKey = subscribeKey(systemStore, "count", (v) => console.log("state.count has changed to", v));
// export const unSystemWatch = watch((get) => {
// 	console.log("state has changed to", get(systemStore));
// });
