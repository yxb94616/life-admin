// 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
}

// 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// 分页响应参数
export interface ResPage<T = any> extends Result {
	data: {
		list: T[];
		count: number;
	};
}

// 分页请求参数
export interface ReqPage {
	page: number;
	limit: number;
	sort?: string;
	order?: string;
}

// 数据库公共字段
export interface IDBRecord {
	deleted: number;
	tenantId: number;
	createTime: string;
	updateTime: string;
}
