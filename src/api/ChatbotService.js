import {apiPrivate} from "./AxiosApi.js";

export const chatWithAi=(message)=>{
    return apiPrivate.get(`/chatbot?message=${message}`)
}