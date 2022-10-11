import Mock from "mockjs";
import { API_LOGIN } from "~@/api/module";

export default () => {
	Mock.setup({
		timeout: "200-1000",
	});

	const baseURL = import.meta.env.VITE_API_URL;

	const result = {
		code: 0,
		data: null,
		message: "操作成功",
	};

	Mock.mock(baseURL + API_LOGIN, "post", {
		...result,
		data: {
			id: "@id",
			username: "@first",
			nickname: "@cname",
			token: "@guid",
		},
	});
};
