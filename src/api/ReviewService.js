import { apiPrivate} from "./AxiosApi.js";

export const saveReview=(data)=>{
    return apiPrivate.post("/interview-reviews",data);
}

export const getReviewByScheduleId=(id)=>{
    return apiPrivate.get(`/interview-reviews?scheduleId=${id}`);
}


export const updateReview=(id,data)=>{
    return apiPrivate.put(`/interview-reviews/${id}`,data);
}