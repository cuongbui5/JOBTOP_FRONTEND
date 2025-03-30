import useLoadingStore from "../../store/LoadingStore.js";

const Loading=()=>{
    const {loading} = useLoadingStore((state) => state);
    const isLoading =  Object.values(loading).some((val) => val);

    return isLoading ? (
        <div className="animated yt-loader"></div>
    ) : null;
}

export default Loading;