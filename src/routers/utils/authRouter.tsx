import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useAtom } from "jotai";
import { getUserinfo } from "~@/api/module/user";
import { WHITE_LIST } from "~@/config/constant";
import { handleUserinfo, tokenAtom, userAtom } from "~@/stores/user";

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const [token] = useAtom(tokenAtom);
	const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		if (!WHITE_LIST.includes(pathname) && user.menus.length === 0) {
			(async function () {
				const { data, message: msg } = await getUserinfo();
				if (data) {
					const { menus, authorities, roles } = handleUserinfo(data);
					setUser({
						info: data,
						menus,
						authorities,
						roles,
					});
				} else {
					message.error(msg);
				}
			})();
		}
	}, [pathname]);

	return (
		<>{WHITE_LIST.includes(pathname) ? props.children : !token ? <Navigate to="/login" replace /> : props.children}</>
	);
};

export default AuthRouter;
