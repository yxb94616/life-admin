import { proxy, ref } from "valtio";
import { devtools } from "valtio/utils";

export const systemStore = proxy({ dom: ref(document.body), isCollapse: false });

if (import.meta.env.DEV) {
	devtools(systemStore, { name: "systemStore", enabled: true });
}

export const updateCollapse = (isCollapse?: boolean) => {
	if (!isCollapse) {
		systemStore.isCollapse = !systemStore.isCollapse;
	} else {
		systemStore.isCollapse = isCollapse;
	}
};
