import { apiPrivate} from "./AxiosApi.js";

export const saveFavoriteJob=(jobId)=>{
    return apiPrivate.post(`favorite-jobs/save?jobId=${jobId}`)
}

export const removeFavoriteJobById=(id)=>{
    return apiPrivate.delete(`favorite-jobs/remove/${id}`)
}

export const getAllFavoriteJobsByUser=()=>{
    return apiPrivate.get(`favorite-jobs`)
}


