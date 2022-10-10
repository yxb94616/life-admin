/** localStorage 存取时用到的 key 的前缀 */
const storage_prefix = "life_";
/** 在 localStorage 存取时用到的 key */
const storage = {
	userinfo: storage_prefix + "user",
	token: storage_prefix + "token",
};

/** 应用中用到的常量 */
const constant = {
	storage,
};

export default constant;
