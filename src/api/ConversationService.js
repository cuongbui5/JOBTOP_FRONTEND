import {apiPrivate} from "./AxiosApi.js";

export const getAllConversations=()=>{
    return apiPrivate.get("conversations")
}

export const getConversationById=(id)=>{
    return apiPrivate.get(`conversations/${id}`)
}


export const createConversationByUser=(data)=>{
    return apiPrivate.post("conversations",data)
}