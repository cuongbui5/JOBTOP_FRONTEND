import {apiPrivate} from "./AxiosApi.js";

export const getAllAccountPlans=()=>{
    return apiPrivate.get("/account-plans");
}

export const activePlan=(id)=>{
    return apiPrivate.post(`/account-plans/active/${id}`);
}

export const cancelPlan=(id)=>{
    return apiPrivate.post(`/account-plans/cancel/${id}`);
}