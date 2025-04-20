import { Skeleton, Card } from "antd";

import useLoadingStore from "../../store/LoadingStore.js";

const LoadingWrapper = ({ children,loadingType }) => {
    const loading = useLoadingStore((state) => state.loading[loadingType]);

    if(loading){
        return <Card style={{ width: "100%", margin:"20px 0" }}>
            <Skeleton active/>
        </Card>
    }
    return children;

};

export default LoadingWrapper;
