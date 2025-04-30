import {apiPrivate} from "./AxiosApi.js";

export const getAccountCountByRole=()=>{
    return apiPrivate.get(`admin/accounts`);
}

export const getJobCountByStatus=()=>{
    return apiPrivate.get(`admin/jobs`);
}


export const getInterviewCountByStatus=()=>{
    return apiPrivate.get(`admin/interviews`);
}

export const getApplicationsCountByStatus=()=>{
    return apiPrivate.get(`admin/applications`);
}


export const getTopUsedPlan=()=>{
    return apiPrivate.get(`admin/plans/top-used`);
}