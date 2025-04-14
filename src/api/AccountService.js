import { apiPrivate} from "./AxiosApi.js";

export function updateAccount(data) {
    return apiPrivate.put(`accounts/update`, data);
}