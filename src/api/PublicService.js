import {api} from "./AxiosApi.js";
import {page_size_view} from "../utils/constans.js";

export const getLocationFilter=()=>{
    return api.get(`public/count-jobs-by-location`);
}

export const getAllJobsView=(filters = {},currentPage=1,currentSize=page_size_view)=>{
    return api.get(`public/getAllJobs`, {
        params: {
            page: currentPage,
            size: currentSize,
            date_posted: filters.date_posted || undefined,
            salary_range: filters.salaryRange || undefined,
            exp: filters.exp || undefined,
            job_type: filters.job_type || undefined,
            companyId: filters.companyId || undefined,
            industryId: filters.industryId || undefined,
            keyword: filters.keyword?.trim() || undefined,
            city: filters.city || undefined,
            sortBy:filters.sortBy||undefined,
        },
        paramsSerializer: (params) => {
            return Object.keys(params)
                .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== "")
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join("&");
        },
    });
}

export function getRelatedJobs(id,currentPage=1,currentSize=5) {
    return api.get(`public/related-jobs/${id}?page=${currentPage}&size=${currentSize}`);
}

export function getRecruiterProfileById(id) {
    return api.get(`public/recruiter-profile/${id}`);
}

export function getUserProfileByUserId(id) {
    return api.get(`public/user-profile/${id}`);
}


export function getCompanyFilter() {
    return api.get(`public/getAllCompanies`);
}
