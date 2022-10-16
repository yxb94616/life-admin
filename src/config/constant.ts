/** localStorage 存取时用到的 key 的前缀 */
const storage_prefix = "life_";

/** 首页地址（默认） */
export const HOME_URL: string = "/home";

/** 不需要登录的路由 */
export const WHITE_LIST = ["/login", "/forget"];

/** 在 localStorage 存取时用到的 key */
const storage = {
	token: storage_prefix + "token",
	tabs: storage_prefix + "tabs",
	global: storage_prefix + "global",
};

/** 应用中用到的常量 */
const constant = {
	storage,
};

export default constant;
