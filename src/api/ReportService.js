import {apiPrivate} from "./AxiosApi.js";

export const createReport=(data)=>{
    return apiPrivate.post("reports",data)
}


export const getAllReports=(page=1,size=5)=>{
    return apiPrivate.get(`reports?page=${page}&size=${size}`)
}