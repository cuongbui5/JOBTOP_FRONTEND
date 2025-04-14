import {apiPrivate} from "./AxiosApi.js";

export function applyJob(jobId,resumeId) {
    return apiPrivate.post(`applications/apply`,{jobId,resumeId});
}

export function getAppliedJobsByUser(page,size,status) {
    const params = new URLSearchParams({ page, size });

    if (status) {
        params.append("status", status);
    }

    return apiPrivate.get(`applications/applied-jobs?${params.toString()}`);
}

export function viewCvApplication(id) {
    return apiPrivate.post(`applications/view/${id}`);
}

export function rejectApplication(id) {
    return apiPrivate.post(`applications/reject/${id}`);
}

export function getApplicationsByFilter(jobId,status) {
    return apiPrivate.get(`applications/getApplicationsByFilter?jobId=${jobId}&status=${status}`);
}

export function approveApplication(id) {
    return apiPrivate.post(`applications/approve/${id}`);
}


export function getApplicationsByCompany(page,size=10,status=null,jobId=null,scheduleId=null) {
    const params = new URLSearchParams({ page, size });

    if (status) {
        params.append("status", status);
    }
    if (jobId) {
        params.append("jobId", jobId);
    }
    if(scheduleId){
        params.append("scheduleId", scheduleId);
    }

    return apiPrivate.get(`applications?${params.toString()}`);
}

export function getApplicationsById(id) {
    return apiPrivate.get(`applications/${id}`);
}


export function addToInterviewSchedule(interviewScheduleId,data) {
    return apiPrivate.patch(`applications/add-to-interview/${interviewScheduleId}`,data);
}

export function removeFromInterviewSchedule(data) {
    return apiPrivate.patch(`applications/remove-from-interview`,data);
}

export function markNoShow(data) {
    return apiPrivate.patch(`applications/mark-no-show`,data);
}

