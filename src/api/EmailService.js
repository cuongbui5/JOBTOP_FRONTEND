import {apiPrivate} from "./AxiosApi.js";

export const sendJobsEmail=(data)=>{
    return apiPrivate.post("emails/jobs-notification",data)
}