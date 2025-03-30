import {apiPrivate} from "./AxiosApi.js";

export function applyJob(jobId,resumeId) {
    return apiPrivate.post(`applications/apply`,{jobId,resumeId});
}

export function getAppliedJobsByUser() {
    return apiPrivate.get(`applications/applied-jobs`);
}

export function viewCvApplication(id) {
    return apiPrivate.post(`applications/view/${id}`);
}




export function getApplicationsByRecruiter(page,size,status) {
    const params = new URLSearchParams({ page, size });

    if (status) {
        params.append("status", status);
    }

    return apiPrivate.get(`applications/getApplicationsByRecruiter?${params.toString()}`);
}

export function getApplicationsById(id) {
    return apiPrivate.get(`applications/${id}`);
}

