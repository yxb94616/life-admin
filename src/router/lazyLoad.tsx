import { Suspense } from "react";
import { Spin } from "antd";

const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
	return (
		<Suspense fallback={<Spin size="large" className="h-full !flex justify-center items-center" />}>
			<Comp />
		</Suspense>
	);
};

export default LazyLoad;
