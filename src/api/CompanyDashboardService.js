import {apiPrivate} from "./AxiosApi.js";

export const getCompanyDashboard=()=>{
    return apiPrivate.get("/employer/dashboard")
}

export const getJobStatistics=(id)=>{
    return apiPrivate.get(`/employer/dashboard/job/${id}`)
}



