import {apiPrivate} from "./AxiosApi.js";

export const evaluateCandidate=(jobId)=>{
    return apiPrivate.post(`ai/evaluate/${jobId}`)
}


export const findJobByResume=()=>{
    return apiPrivate.get(`ai/find-job-by-cv`)
}