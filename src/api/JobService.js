import {api, apiPrivate} from "./AxiosApi.js";

export const getAllJobs=(page=1,size=5,status,createdBy)=>{
    return apiPrivate.get(`jobs?page=${page}&size=${size}`,{
        params:{
            status:status||undefined,
            createdBy:createdBy||undefined
        }
    });
}

export const getAllJobsTitle=()=>{
    return apiPrivate.get("jobs/titles")
}

export const getJob=(id,view=true)=>{
    return api.get(`jobs/${id}?view=${view}`);
}

export const createJob=(data)=>{
    return apiPrivate.post(`jobs/create`,data);
}
export const updateJob=(id,data)=>{
    return apiPrivate.put(`jobs/update/${id}`,data);
}

export const updateJobStatus=(id,data)=>{
    return apiPrivate.patch(`jobs/update-status/${id}`,data);
}

export const deleteJob=(id)=>{
    return apiPrivate.delete(`jobs/${id}`);
}
