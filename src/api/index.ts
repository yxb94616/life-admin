import { message } from "antd";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import constant from "~@/config/constant";
import { ResultEnum } from "./helper/httpEnum";
import ignoreTokenApis from "./ignoreTokenApis";

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL,
	// 设置超时时间，单位 ms
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true,
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		// 请求拦截器
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				if (config.url && !ignoreTokenApis.includes(config.url)) {
					const token = JSON.parse(localStorage.getItem(constant.storage.token) ?? "null");
					return { ...config, headers: { ...config.headers, Authorization: token } };
				} else {
					return { ...config };
				}
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			},
		);

		// 响应拦截器
		this.service.interceptors.response.use((response: AxiosResponse) => {
			const { data } = response;

			// * 登录失效 code == 401
			if (data.code === ResultEnum.OVERDUE) {
				message.destroy();
				message.error(data.msg);
				localStorage.removeItem(constant.storage.token);
				window.location.href = "/login";
				return Promise.reject(data);
			}

			// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
			if (data.code && data.code !== ResultEnum.SUCCESS) {
				message.destroy();
				message.error(data.msg);
				return Promise.reject(data);
			}

			// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
			return data;
		});
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<T> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<T> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<T> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<T> {
		return this.service.delete(url, { params, ..._object });
	}
}

export const http = new RequestHttp(config);
