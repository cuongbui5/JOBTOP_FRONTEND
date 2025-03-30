import {api, apiPrivate} from "./AxiosApi.js";

export const getAllJobByUser=(page=1,size=5)=>{
    return apiPrivate.get(`jobs/getByProfile?page=${page}&size=${size}`);
}
export const getAllJobs=(page=1,size=5,status="")=>{
    return apiPrivate.get(`jobs?page=${page}&size=${size}&status=${status}`);
}

export const getJob=(id)=>{
    return api.get(`public/jobs/${id}`);
}
export const getFavoriteJob=()=>{
    return apiPrivate.get(`jobs/getFavoriteJobs}`);
}



export const approveJob=(id)=>{
    return apiPrivate.post(`jobs/${id}/approve`);
}

export const rejectJob=(id)=>{
    return apiPrivate.post(`jobs/${id}/reject`);
}


export const saveJob=(data)=>{
    return apiPrivate.post(`jobs`,data);
}
export const deleteJob=(id)=>{
    return apiPrivate.delete(`jobs/${id}`);
}
