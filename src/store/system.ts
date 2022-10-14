import type { SizeType } from "antd/es/config-provider/SizeContext";
import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import constant, { HOME_URL } from "~@/config/constant";
import { ITabs } from "./interface";

const home_tab = {
	title: "首页",
	path: HOME_URL,
};

interface IGlobalConfig {
	isCollapse?: boolean;
	isBreadcrumb?: boolean;
	isTabs?: boolean;
	isFooter?: boolean;
	size?: SizeType;
}

const globalInit: IGlobalConfig = {
	isCollapse: false,
	isBreadcrumb: true,
	isTabs: true,
	isFooter: true,
	size: "middle",
};

export const systemStore = proxy<{
	tabs: ITabs[];
	global: IGlobalConfig;
}>({
	tabs: JSON.parse(localStorage.getItem(constant.storage.tabs) || "null") || [home_tab],
	global: JSON.parse(localStorage.getItem(constant.storage.global) || "null") || globalInit,
});

if (import.meta.env.DEV) {
	devtools(systemStore, { name: "systemStore", enabled: true });
}

const setTabsStorage = () => {
	localStorage.setItem(constant.storage.tabs, JSON.stringify(systemStore.tabs));
};

export const addTabs = (tab: ITabs) => {
	const find = systemStore.tabs.find((item) => item.path == tab.path);
	if (!find) {
		systemStore.tabs.push(tab);
		setTabsStorage();
	}
};

export const delTabs = (path: string) => {
	const index = systemStore.tabs.findIndex((item) => item.path == path);
	if (index) {
		systemStore.tabs = systemStore.tabs.filter((item) => item.path != path);
		setTabsStorage();
		return systemStore.tabs[index - 1];
	}
};

export const closeMultipleTabs = (path?: string) => {
	if (path && path != HOME_URL) {
		const tab = systemStore.tabs.find((item) => item.path == path);
		if (tab) {
			systemStore.tabs = [home_tab, tab];
		}
	} else {
		systemStore.tabs = [home_tab];
	}
	setTabsStorage();
};

export const updateGlobalConfig = (config: IGlobalConfig) => {
	systemStore.global = { ...systemStore.global, ...config };
	localStorage.setItem(constant.storage.global, JSON.stringify(systemStore.global));
};
