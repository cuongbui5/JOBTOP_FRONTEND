import {apiPrivate} from "./AxiosApi.js";

export const getAllInterviewByApplication=(id)=>{
    return apiPrivate.get(`interview-schedule/application/${id}`);
}

export const getAllInterviewByUser=()=>{
    return apiPrivate.get("interview-schedule");
}


export const createInterViewSchedule=(data)=>{
    return apiPrivate.post("interview-schedule",data);
}
export const updateSchedule=(id,data)=>{
    return apiPrivate.put(`interview-schedule/${id}`,data);
}

export const getScheduleById=(id)=>{
    return apiPrivate.get(`interview-schedule/${id}`);
}