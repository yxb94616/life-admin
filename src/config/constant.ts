/** localStorage 存取时用到的 key 的前缀 */
const storage_prefix = "life_";

// * 首页地址（默认）
export const HOME_URL: string = "/home";

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址）
export const TABS_BLACK_LIST: string[] = ["/403", "/404", "/500", "/layout", "/login", "/dataScreen"];

// * 高德地图key
export const MAP_KEY: string = "";

/** 在 localStorage 存取时用到的 key */
const storage = {
	userinfo: storage_prefix + "user",
	token: storage_prefix + "token",
	tabs: storage_prefix + "tabs",
	global: storage_prefix + "global",
};

/** 应用中用到的常量 */
const constant = {
	storage,
};

export default constant;
