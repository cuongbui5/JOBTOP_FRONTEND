import { apiPrivate} from "./AxiosApi.js";

export function updateAccount(data) {
    return apiPrivate.put(`accounts/update`, data);
}

export function updateAccountStatus(id,status) {
    return apiPrivate.post(`accounts/update-status/${id}?status=${status}`);
}

export function getAllAccounts(page,size,roleType=null,companyName) {
    return apiPrivate.get(`accounts?page=${page}&size=${size}`,{
        params:{
            roleType:roleType||undefined,
            companyName:companyName||undefined

        }
    });
}