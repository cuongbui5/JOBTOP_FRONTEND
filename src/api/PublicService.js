import {api} from "./AxiosApi.js";
import {page_size_view} from "../utils/constans.js";

export const getLocationFilter=()=>{
    return api.get(`public/count-jobs-by-location`);
}

export const getTopJobView=(num)=>{
    return api.get(`public/jobs/top-view?top=${num}`);
}



export const getAllDesiredPositions=()=>{
    return api.get(`public/desired-positions`);
}

export const getAllCities=()=>{
    return api.get(`public/cities`);
}


export const getAllJobsView = (filters = {}, currentPage = 1, currentSize = page_size_view) => {
    return api.get(`public/getAllJobs`, {
        params: {
            page: currentPage,
            size: currentSize,
            categoryIds: filters.categoryId || undefined,
            salaryRange: filters.salaryRange || undefined,
            exps: filters.exp || undefined,
            jobTypes: filters.job_type || undefined,
            companyIds: filters.companyId || undefined,
            keyword: filters.keyword?.trim() || undefined,
            cities: filters.city || undefined,
            sortBy: filters.sortBy || undefined,
        },
        paramsSerializer: (params) => {
            return Object.keys(params)
                .filter(
                    (key) => params[key] !== undefined && params[key] !== null && params[key] !== ""
                )
                .map((key) => {
                    const value = params[key];
                    if (Array.isArray(value)) {
                        return `${encodeURIComponent(key)}=${value.join(",")}`;
                    }
                    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                })
                .join("&");
        },
    });
};



export function getRelatedJobs(id,currentPage=1,currentSize=5) {
    return api.get(`public/related-jobs/${id}?page=${currentPage}&size=${currentSize}`);
}

export function getCompanyById(id) {
    return api.get(`public/company/${id}`);
}

export function getUserProfileByUserId(id) {
    return api.get(`public/user-profile/${id}`);
}


export function getAllCompanies() {
    return api.get(`public/companies`);
}

export const getAllReviewByJobId=(jobId,page=1,size=5)=>{
    return api.get(`public/reviews?jobId=${jobId}&page=${page}&size=${size}`);
}

export const sematicSearch=(key)=>{
    return api.get(`public/jobs/sematic-search?key=${key}`);
}


export const getReviewStats=(jobId)=>{
    return api.get(`public/reviews/stats/${jobId}`);
}

export function getStatusStats(jobId) {
    return api.get(`public/applications/status-stats?jobId=${jobId}`);
}