import {api, apiPrivate} from "./AxiosApi.js";

export const saveReview=(data)=>{
    return apiPrivate.post("/interview-reviews",data);
}

export const getReviewBySlotId=(id)=>{
    return apiPrivate.get(`/interview-reviews/interview-slot/${id}`);
}


export const updateReview=(id,data)=>{
    return apiPrivate.put(`/interview-reviews/${id}`,data);
}