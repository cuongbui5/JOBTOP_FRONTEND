import {apiPrivate} from "./AxiosApi.js";

export const createReport=(data)=>{
    return apiPrivate.post("reports",data)
}