import { ReactNode } from "react";

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	/** 应用名称 */
	readonly VITE_APP_TITLE: string;
	/** 开发端口 */
	readonly VITE_PORT: number;
	/** 运行 npm run dev 时自动打开浏览器 */
	readonly VITE_OPEN: boolean;
	/** 是否生成依赖分析文件 */
	readonly VITE_REPORT: boolean;
	/** 是否开启gzip压缩 */
	readonly VITE_BUILD_GZIP: boolean;
	/** 是否删除生产环境 console */
	readonly VITE_DROP_CONSOLE: boolean;
	/** api 接口地址 */
	readonly VITE_API_URL: string;
}

// * Menu
declare interface MenuOptions {
	path: string;
	title: string;
	icon?: ReactNode;
	isLink?: string;
	close?: boolean;
	children?: MenuOptions[];
}
