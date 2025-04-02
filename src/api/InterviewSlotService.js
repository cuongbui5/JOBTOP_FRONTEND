import {apiPrivate} from "./AxiosApi.js";

export const getAllSlotsByUser=()=>{
    return apiPrivate.get("interview-slots/getByUser")
}

export const updateSlotStatusById=(id,data)=>{
    return apiPrivate.put(`interview-slots/${id}`,data)
}

export const createManySlots=(data)=>{
    return apiPrivate.post(`interview-slots/creates`,data)
}

export const deleteSlotById=(id)=>{
    return apiPrivate.delete(`interview-slots/delete/${id}`)
}



export const getAllSlotsByInterviewScheduleId=(id)=>{
    return apiPrivate.get(`interview-slots/interview-schedule/${id}`)
}


