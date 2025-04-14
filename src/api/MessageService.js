import {apiPrivate} from "./AxiosApi.js";

export const getAllMessageByConversationId=(conversationId,page=1,size=10)=>{
    return apiPrivate.get(`messages?conversationId=${conversationId}&page=${page}&size=${size}`)
}

export const createMessage=(data)=>{
    return apiPrivate.post("messages",data)
}