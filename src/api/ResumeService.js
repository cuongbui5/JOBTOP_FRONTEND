import {apiPrivate} from "./AxiosApi.js";

export const getAllResumesByUser=()=>{
    return apiPrivate.get("resumes/byUser");
}

export const createNewResume=(resume)=>{
    return apiPrivate.post(`resumes`,resume);
}

export const updateResumeById=(id,resume)=>{
    return apiPrivate.put(`resumes/${id}`,resume);
}

export const deleteResumeById=(id)=>{
    return apiPrivate.delete(`resumes/${id}`);
}

export const setResumeDefaultForAccount=(id)=>{
    return apiPrivate.post(`resumes/set-default/${id}`);
}
