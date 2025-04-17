import {apiPrivate} from "./AxiosApi.js";

export const getAllNotifications=(page=1,size=10)=>{
    return apiPrivate.get(`notifications?page=${page}&size=${size}`)
}

export const deleteNotification=(id)=>{
    return apiPrivate.delete(`notifications/${id}`)
}