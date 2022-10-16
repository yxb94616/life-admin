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
	console.log(pathname);

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

	// // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	// const dynamicRouter = store.getState().auth.authRouter;
	// // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	// const staticRouter = [HOME_URL, "/403"];
	// const routerList = dynamicRouter.concat(staticRouter);
	// // * 如果访问的地址没有在路由表中重定向到403页面
	// if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
};

export default AuthRouter;
