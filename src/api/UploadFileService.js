import {apiPrivate} from "./AxiosApi.js";

export const uploadFile= (file)=>{
    const formData = new FormData();
    formData.append("file", file);
    return apiPrivate.post(
        "http://localhost:7000/upload-file",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    );

}