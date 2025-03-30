import { notification, message } from "antd";
import useLoadingStore from "../store/LoadingStore.js";
// Import Zustand store

const useApiRequest = () => {
    const { setLoading } = useLoadingStore(state => state); // Lấy loading từ Zustand


    const handleRequest = async (apiCall, onSuccess,loadingType=null,hasNotification =false) => {
        try {
            setLoading("loading",true)
            if (loadingType) setLoading(loadingType, true);
            // Bật loading toàn cục

            console.log("Calling API...");
            const response = await apiCall();

            // Tắt loading sau khi API xong


            if (response.status === 200 || response.status === 201) {
                if(hasNotification){
                    notification.success({
                        message:"Success!"
                    })
                }
                onSuccess(response);
            } else {
                message.error(response.message || "Unknown error occurred");
            }


            return response;
        } catch (error) {
            console.error("API request error:", error);
            await showNotification(error.errorMessage);

            if(error.errorCode===401&&error.errorMessage){
                window.location.href = "/login";
            }

            if(error.errorMessage==="401 Unauthorized from GET https://api.github.com/user"){
                window.location.href = "/login";
            }



            if (error.errorMessage?.includes("TokenExpired")) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }finally {
            setLoading("loading",false)
            if (loadingType) setLoading(loadingType, false);
        }
    };

    return { handleRequest };
};

const showNotification = (errorMessage) => {
    return new Promise((resolve) => {
        notification.error({
            message: "Lỗi",
            description: errorMessage || "Có lỗi xảy ra!",
            duration: 3, // Thời gian hiển thị (giây)
            onClose: resolve, // Khi đóng notification thì resolve Promise
        });
    });
};

export default useApiRequest;
