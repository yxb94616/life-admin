import { Suspense } from "react";
import Loading from "~@/components/Loading";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
	return (
		<Suspense fallback={<Loading />}>
			<Comp />
		</Suspense>
	);
};

export default LazyLoad;
