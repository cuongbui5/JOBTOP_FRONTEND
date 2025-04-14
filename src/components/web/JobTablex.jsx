// src/components/JobTable.jsx
import { Button, Flex, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {getExperienceLabel, getJobStatusLabel, getJobTypeLabel} from "../../utils/helper.js";


// eslint-disable-next-line react/prop-types
const JobTable = ({jobs, pagination, currentPage, onPageChange, onEdit, onDelete}) => {
    const handleTableChange = (pagination) => {
        onPageChange(pagination.current);
    };

    const columns = [
        { title: "Id", dataIndex: "id", key: "id" },
        {
            title: "Tên công việc",
            dataIndex: "title",
            key: "title",
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Thành phố",
            dataIndex: "city",
            key: "city",
            responsive: ["sm", "md", "lg", "xl"],
        },
        {
            title: "Hình thức làm việc",
            dataIndex: "jobType",
            key: "jobType",
            render: (jobType) => <Tag>{getJobTypeLabel(jobType).text}</Tag>,
            responsive: ["md", "lg", "xl"],
        },
        {
            title: "Kinh nghiệm",
            dataIndex: "experienceLevel",
            key: "experienceLevel",
            render: (exp) => <Tag>{getExperienceLabel(exp).text}</Tag>,
            responsive: ["lg", "xl"],
        },
        {
            title: "Mức lương",
            key: "salary",
            render: (_, record) => (
                <span>
          {record.salaryMin} - {record.salaryMax} đ/tháng
        </span>
            ),
            responsive: ["lg", "xl"],
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const { text, color } = getJobStatusLabel(status);
                return <Tag color={color}>{text}</Tag>;
            },
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Hạn nộp",
            dataIndex: "applicationDeadline",
            key: "applicationDeadline",
            responsive: ["lg", "xl"],
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Flex gap="small" wrap="wrap">
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
                        Chỉnh sửa
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => onDelete(record)}
                    >
                        Xóa
                    </Button>
                </Flex>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
    ];

    return (
        <Table
            scroll={{ x: "max-content" }}
            rowKey="id"
            columns={columns}
            dataSource={jobs}
            pagination={{ ...pagination, current: currentPage }}
            onChange={handleTableChange}
        />
    );
};

export default JobTable;
