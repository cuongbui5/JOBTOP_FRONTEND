import {apiPrivate} from "./AxiosApi.js";

export const checkoutPlan=(planId)=>{
    return apiPrivate.post(`/checkout/${planId}`)
}