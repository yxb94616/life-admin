import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useAtomsDevtools } from "jotai/devtools";
import { atomWithStorage } from "jotai/utils";
import constant, { HOME_URL } from "~@/config/constant";
import { ITabs } from "~@/stores/interface";

export interface IGlobalConfig {
	isCollapse?: boolean;
	isBreadcrumb?: boolean;
	isTabs?: boolean;
	isFooter?: boolean;
	size?: SizeType;
	primaryColor?: string;
	isDark?: boolean;
	isWeak?: boolean;
}

export const globalAtom = atomWithStorage<IGlobalConfig>(constant.storage.global, {
	isCollapse: false,
	isBreadcrumb: true,
	isTabs: true,
	isFooter: true,
	size: "middle",
	primaryColor: import.meta.env.VITE_APP_COLOR,
	isDark: false,
	isWeak: false,
});

export const home_tab = {
	title: "首页",
	path: HOME_URL,
};

export const tabsAtom = atomWithStorage<ITabs[]>(constant.storage.tabs, [home_tab]);

export const AtomsDevtools = ({ children }: { children: JSX.Element }) => {
	useAtomsDevtools("life-admin");
	return children;
};
