import axios from "axios";


const BASE_URL = "http://127.0.0.1:7000/";
const MAX_RETRY=3;
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
    headers:{

    }
});
api.interceptors.request.use(
    (config) => {
        //alert(`🔵 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        if (error.response) {
            const config = error.config;
            console.log(error.response)
            if (!config.__retryCount) {
                config.__retryCount = 0;
            }

            if(error.response.data.message.includes("Connection reset")&&config.__retryCount < MAX_RETRY){
                console.log("retry")
                await new Promise(res => setTimeout(res, 1000));
                return api(config)
            }
            return Promise.reject({
                errorCode: error.response.data.status,
                errorMessage: error.response.data.message || "Something went wrong!",
            });
        } else {
            return Promise.reject({ errorMessage: "Network error or server not responding" });
        }
    }
);

const apiPrivate=axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
apiPrivate.interceptors.request.use(
    async (config) => {
       // alert(`🔵 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        const accessToken = localStorage.getItem('token');
        console.log(accessToken)
        if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
apiPrivate.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.log(error)
            return Promise.reject({
                errorCode: error.response.data.status,
                errorMessage: error.response.data.message || "Something went wrong!",
            });
        } else {
            return Promise.reject({ errorMessage: "Network error or server not responding" });
        }
    }
);







export { api, apiPrivate };




