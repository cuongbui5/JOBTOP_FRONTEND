import { useState } from "react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useWebStore } from "../../store/WebStore.jsx";
import useJobStore from "../../store/JobStore.jsx";

const salaryOptions = [
    { key: 'below_10m', label: 'Dưới 10 triệu' },
    { key: '10m_20m', label: '10 - 20 triệu' },
    { key: '20m_30m', label: '20 - 30 triệu' },
    { key: '30m_50m', label: '30 - 50 triệu' },
    { key: 'above_50m', label: 'Trên 50 triệu' }
];

const filterByDateOptions = [
    { key: '1', label: '24 giờ trước' },
    { key: '3', label: '3 ngày trước' },
    { key: '7', label: '7 ngày trước' },
    { key: '14', label: '14 ngày trước' },
];

const experienceOptions = [
    { key: 'NO_REQUIREMENT', label: 'Chưa có kinh nghiệm' },
    { key: 'LESS_THAN_ONE_YEAR', label: 'Dưới 1 năm' },
    { key: 'ONE_YEAR', label: '1 năm' },
    { key: 'TWO_YEARS', label: '2 năm' },
    { key: 'THREE_YEARS', label: '3 năm'},
    { key: 'FOUR_YEARS', label: '4 năm' },
    { key: 'FIVE_YEARS', label: '5 năm' },
    { key: 'MORE_THAN_FIVE_YEARS', label: 'Trên 5 năm' }
];

const jobTypeOptions = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'FULL_TIME', label: 'Toàn thời gian' },
    { key: 'PART_TIME', label: 'Bán thời gian' },
    { key: 'INTERNSHIP', label: 'Thực tập' },
    { key: 'OTHER', label: 'Khác' }
];

const JobFilter = () => {
    const { industries, recruiterProfiles } = useWebStore(state => state);
    const {setFilters,filters}=useJobStore(state => state)


    const getLabel = (key, options) => {
        return options?.find((item) => item.key === key)?.label || null;
    };


    // Hàm xử lý chọn dropdown
    const handleMenuClick = (key, type) => {
        setFilters({  [type]: key });
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "40px",
            flexWrap: "wrap",
        }}>
            <Dropdown menu={{
                items: filterByDateOptions,
                onClick: ({ key }) => handleMenuClick(key, "date_posted")
            }}>
                <Button iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(filters?.date_posted, filterByDateOptions) || "Ngày đăng"}
                </Button>
            </Dropdown>

            <Dropdown menu={{
                items: salaryOptions,
                onClick: ({ key }) => handleMenuClick(key, "salaryRange")
            }}>
                <Button   iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(filters?.salaryRange, salaryOptions) || "Mức lương"}
                </Button>
            </Dropdown>

            <Dropdown menu={{
                items: experienceOptions,
                onClick: ({ key }) => handleMenuClick(key, "exp")
            }}>
                <Button   iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(filters?.exp, experienceOptions) || "Kinh nghiệm"}
                </Button>
            </Dropdown>

            <Dropdown menu={{
                items: recruiterProfiles?.map(company => ({
                    key: company.id,
                    label: company.companyName,
                })),
                onClick: ({ key }) => handleMenuClick(key, "companyId")
            }}>
                <Button   iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(
                        filters?.companyId,
                        recruiterProfiles?.map((c) => ({ key: c.id+"", label: c.companyName }))
                    ) || "Công ty"}
                </Button>
            </Dropdown>

            <Dropdown menu={{
                items: jobTypeOptions,
                onClick: ({ key }) => handleMenuClick(key, "job_type")
            }}>
                <Button   iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(filters?.job_type, jobTypeOptions) || "Hình thức làm việc"}
                </Button>
            </Dropdown>

            <Dropdown menu={{
                items: industries?.map(item => ({
                    key: item.id,
                    label: item.name,
                })),
                onClick: ({ key }) => handleMenuClick(key, "industryId")
            }}>
                <Button   iconPosition={"end"} icon={<DownOutlined />} size="large" style={{ background: "#E5E1DE" }}>
                    {getLabel(filters?.industryId, industries?.map(i => ({ key: i.id+"", label: i.name }))) || "Theo danh mục nghề"}
                </Button>
            </Dropdown>
            <Button
                size="large"
                style={{ background: "#FF4D4F", color: "white" }}
                onClick={() => {
                    setFilters({
                        exp: null,
                        date_posted: null,
                        salaryRange: null,
                        job_type: null,
                        companyId: null,
                        industryId: null
                    })
                }}
            >
                Xóa lọc
            </Button>
        </div>
    );
};

export default JobFilter;
