import {apiPrivate} from "./AxiosApi.js";

export const getAllInterviewByCompany=()=>{
    return apiPrivate.get("interview-schedules");
}



export const createInterViewSchedule=(data)=>{
    return apiPrivate.post("interview-schedules",data);
}
export const updateSchedule=(id,data)=>{
    return apiPrivate.put(`interview-schedules/${id}`,data);
}

export const getScheduleById=(id)=>{
    return apiPrivate.get(`interview-schedules/${id}`);
}