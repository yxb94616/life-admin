import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { getUserinfo } from "~@/api/module/user";
import { WHITE_LIST } from "~@/config/constant";
import { updateUserinfo, userStore } from "~@/store/user";

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const { pathname } = useLocation();

	// 在跳转路由之前，清除所有的请求

	// 判断当前路由是否在白名单内
	if (WHITE_LIST.includes(pathname)) {
		return props.children;
	}

	// 判断是否有Token
	if (!userStore.token) {
		return <Navigate to="/login" replace />;
	}

	if (userStore.menus.length === 0) {
		(async function () {
			const { data, message: msg } = await getUserinfo();
			if (data) {
				updateUserinfo(data);
			} else {
				message.error(msg);
			}
		})();
	}

	return props.children;
};

export default AuthRouter;
