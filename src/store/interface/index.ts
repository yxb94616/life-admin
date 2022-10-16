import { IMenu } from "~@/api/interface/user";

// tabs 标签页
export interface ITabs {
	title: IMenu["title"];
	path: IMenu["path"];
}
