import { Suspense } from "react";
import Loading from "~@/components/Loading";

const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
	return (
		<Suspense fallback={<Loading />}>
			<Comp />
		</Suspense>
	);
};

export default LazyLoad;
