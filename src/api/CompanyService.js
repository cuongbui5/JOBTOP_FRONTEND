import {apiPrivate} from "./AxiosApi.js";

export function updateCompany(id,data) {
    return apiPrivate.patch(`companies/update/${id}`, data);
}

export function createCompany(data) {
    return apiPrivate.post(`companies/create`, data);
}

export function getCompanyProfile() {
    return apiPrivate.get(`companies`);
}

