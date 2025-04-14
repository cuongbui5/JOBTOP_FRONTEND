export const getStoredUser=()=>{
    return JSON.parse(localStorage.getItem("user")) ;
}

export const removeById=(array, idsToRemove)=> {
    const ids = Array.isArray(idsToRemove) ? idsToRemove : [idsToRemove];
    return array.filter(item => !ids.includes(item.id));
}
const JobStatus = {
    PENDING: { text: "Chờ duyệt", color: "orange" },
    APPROVED: { text: "Đã duyệt", color: "green" },
    REJECTED: { text: "Từ chối", color: "red" }
};

const ExperienceLevel = {
    NO_REQUIREMENT: { text: "Không yêu cầu" },
    LESS_THAN_ONE_YEAR: { text: "Dưới 1 năm" },
    ONE_YEAR: { text: "1 năm" },
    TWO_YEARS: { text: "2 năm" },
    THREE_YEARS: { text: "3 năm" },
    FOUR_YEARS: { text: "4 năm" },
    FIVE_YEARS: { text: "5 năm" },
    MORE_THAN_FIVE_YEARS: { text: "Trên 5 năm" }
};

const JobType = {
    ALL: { text: "Tất cả" },
    FULL_TIME: { text: "Toàn thời gian" },
    PART_TIME: { text: "Bán thời gian" },
    INTERNSHIP: { text: "Thực tập" },
    OTHER: { text: "Khác" }
};

const AccountStatus = {
    ACTIVE: { text: "Đang hoạt động", color: "green" },
    BANNED: { text: "Khóa vĩnh viễn", color: "red" }
};

export const ApplicationStatus = {
    PENDING: { text: "Đang chờ xử lý", color: "orange" },
    VIEWED: { text: "Đã xem", color: "blue" },
    APPROVED: { text: "Được chấp nhận", color: "green" },
    ADDED_TO_INTERVIEW: { text: "Đã thêm vào phỏng vấn", color: "cyan" },
    COMPLETED: { text: "Đã hoàn thành", color: "purple" },
    NO_SHOW: { text: "Vắng mặt khi phỏng vấn", color: "volcano" },
    REJECTED: { text: "Bị từ chối", color: "red" }
};

const InterviewStatus = {
    SCHEDULED: { text: "Đã lên lịch", color: "blue" },
    CANCELED_BY_RECRUITER: { text: "Nhà tuyển dụng đã hủy", color: "volcano" },
    COMPLETED: { text: "Đã hoàn thành", color: "green" }
};

const RoleType = {
    CANDIDATE: { text: "Ứng cử viên", color: "geekblue" },
    EMPLOYER: { text: "Nhà tuyển dụng", color: "purple" },
    ADMIN: { text: "Admin", color: "gold" }
};



export const getExperienceLabel = (key) => {
    return ExperienceLevel[key] ??  { text: "Không xác định", color: "default" };
};

export const getJobTypeLabel = (key) => {
    return JobType[key] ||  { text: "Không xác định", color: "default" };
};

export const getJobStatusLabel = (key) => {
    return JobStatus[key] ??  { text: "Không xác định", color: "default" };
};

export const getAccountStatusLabel = (key) => {
    return AccountStatus[key] || { text: "Không xác định", color: "default" };
};


export const getApplicationStatusLabel = (key) => {
    return ApplicationStatus[key] ||  { text: "Không xác định", color: "default" };
};

export const getInterviewStatusLabel = (key) => {
    return InterviewStatus[key] ||  { text: "Không xác định", color: "default" };
};

export const getRoleTypeLabel = (key) => {
    return RoleType[key] ||  { text: "Không xác định", color: "default" };
};