export const getStoredUser=()=>{
    return JSON.parse(localStorage.getItem("user")) ;
}

export const removeById=(array, idsToRemove)=> {

    const ids = Array.isArray(idsToRemove) ? idsToRemove : [idsToRemove];
    return array.filter(item => !ids.includes(item.id));
}

const ExperienceLevel = {
    NO_REQUIREMENT: "Không yêu cầu",
    LESS_THAN_ONE_YEAR: "Dưới 1 năm",
    ONE_YEAR: "1 năm",
    TWO_YEARS: "2 năm",
    THREE_YEARS: "3 năm",
    FOUR_YEARS: "4 năm",
    FIVE_YEARS: "5 năm",
    MORE_THAN_FIVE_YEARS: "Trên 5 năm",
};
const JobType = {
    ALL: "Tất cả",
    FULL_TIME: "Toàn thời gian",
    PART_TIME: "Bán thời gian",
    INTERNSHIP: "Thực tập",
    OTHER: "Khác",
};
export const getExperienceLabel = (key) => {
    return ExperienceLevel[key] || "Không xác định";
};

export const getJobTypeLabel = (key) => {
    return JobType[key] || "Không xác định";
};