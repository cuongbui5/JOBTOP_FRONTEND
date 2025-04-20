import {api, apiPrivate} from "./AxiosApi.js";

export const getAllPlans=()=>{
    return api.get("/plans");
}

export const createPlan=(data)=>{
    return apiPrivate.post("/plans",data)
};

export const updatePlan=(id,data)=>{
    return apiPrivate.put(`/plans/${id}`,data)
};

export const deletePlan=(id)=>{
    return apiPrivate.delete(`/plans/${id}`)
};