import {Modal, Table, Tag, Select, Space, Tabs} from "antd";
import { useEffect, useState } from "react";
import useHandleApi from "../../hooks/UseHandleApi";
import {
    addToInterviewSchedule,
    getApplicationsByCompany, markNoShow,
    removeFromInterviewSchedule
} from "../../api/ApplicationService";

import dayjs from "dayjs";
import { getApplicationStatusLabel } from "../../utils/helper";
import {getAllJobsTitle} from "../../api/JobService.js";
const { Option } = Select;

// eslint-disable-next-line react/prop-types
const SelectApplicationModal = ({ open, onClose,schedule }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [applications, setApplications] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const { handleRequest } = useHandleApi();
    const [jobs,setJobs]=useState(null);
    const [jobIdSelected,setJobIdSelected]=useState(null);
    const [viewStatus, setViewStatus] = useState(null);
    const [activeTab, setActiveTab] = useState("1")

    const fetchApplications = async (page, size,status,jobId,scheduleId) => {
        await handleRequest(
            () => getApplicationsByCompany(page, size,status,jobId,scheduleId),
            (res) => {
                console.log(res);
                setApplications(res.data.content || []);
                setPagination({
                    current: res.data.currentPage,
                    pageSize: size,
                    total: res.data.totalElements,
                });
            }
        );
    };

    const handleTableChange = (pagination) => {
        if(activeTab==="1"){
            fetchApplications(pagination.current, pagination.pageSize,viewStatus,jobIdSelected);
        }else {
            fetchApplications(pagination.current, pagination.pageSize,null,null,schedule?.id);
        }

    };


    const columns = [
        {
            title: "Tên công việc",
            dataIndex: "jobTitle",
            key: "jobTitle",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const { text, color } = getApplicationStatusLabel(status);
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },

    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };
    const getOkText = () => {
        if (activeTab === "1") return "Thêm ứng viên vào lịch phỏng vấn";
        if (schedule?.status === "COMPLETED") return "Đánh dấu vắng mặt";
        return "Xóa ứng viên khỏi lịch phỏng vấn";
    };


    const handleOk = async () => {
        const selectedApplicationIds = applications
            .filter(app => selectedRowKeys.includes(app.id)).map(app => app.id);
        if(activeTab==="1"){
            await handleRequest(()=>addToInterviewSchedule(schedule?.id,{applicationIds:selectedApplicationIds}),(res)=>{
                fetchApplications(1, pagination.pageSize,viewStatus,jobIdSelected);


            })
        }else {
            if(schedule?.status==="COMPLETED"){
                await handleRequest(()=>markNoShow({applicationIds:selectedApplicationIds}),(res)=>{
                    console.log(res);

                })
            }else {
                await handleRequest(()=>removeFromInterviewSchedule({applicationIds:selectedApplicationIds}),(res)=>{
                    console.log(res);
                })
            }


        }




    };

    useEffect(() => {
        const fetchJobTitle=async ()=>{
            await handleRequest(()=>getAllJobsTitle(),(res)=>{
                console.log(res);
                setJobs(res.data)

            })
        }
        fetchJobTitle();
    }, []);



    const viewStatusOptions = [
        { value: "PENDING", label: "Chưa xem" },
        { value: "VIEWED", label: "Đã xem" },
        { value: "APPROVED", label: "Được chấp nhận" },
        { value: "REJECTED", label: "Từ chối" },
        { value: "ADDED_TO_INTERVIEW", label: "Đã thêm vào phỏng vấn" },
        { value: "NO_SHOW", label: "Vắng mặt khi phỏng vấn" },
        { value: "COMPLETED", label: "Đã hoàn thành" },
    ];

    useEffect(() => {
        if (open) {
            setActiveTab("1")
            setSelectedRowKeys([]);
        }
    }, [open]);

    const handleTabChange = (key) => {
        setActiveTab(key)

    }

    useEffect(()=>{
        setSelectedRowKeys([]);
        if (activeTab === "1") {
            fetchApplications(1, pagination.pageSize, viewStatus, jobIdSelected)
        } else if (activeTab === "2") {
            fetchApplications(1, pagination.pageSize,null,null,schedule?.id)
        }
    },[activeTab])

    const tabItems = [
        {
            key: "1",
            label: "Chọn ứng viên",
            children: (
                <>
                    <Space>
                        <Select
                            allowClear
                            placeholder="Nhóm theo công việc"
                            onChange={(value) => {
                                setJobIdSelected(value)
                                fetchApplications(1, pagination.pageSize, viewStatus, value)
                            }}
                            style={{ width: 200, marginBottom: 16 }}
                        >
                            {jobs?.map((option) => (
                                <Option key={option.id} value={option.id}>
                                    {option.title}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            value={viewStatus}
                            allowClear
                            placeholder="Chọn trạng thái"
                            onChange={(value) => {
                                setViewStatus(value)
                                fetchApplications(1, pagination.pageSize, value, jobIdSelected)
                            }}
                            style={{ width: 200, marginBottom: 16 }}
                        >
                            {viewStatusOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Space>

                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={applications}
                        rowSelection={rowSelection}
                        pagination={pagination}
                        onChange={handleTableChange}
                        scroll={{ x: "max-content" }}
                    />
                </>
            ),
        },
        {
            key: "2",
            label: "Ứng viên đã trong lịch phỏng vấn",
            children: (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={applications}
                    rowSelection={rowSelection}
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: "max-content" }}
                />
            ),
        },
    ]


    return (
        <Modal
            title="Chọn đơn ứng tuyển phù hợp"
            open={open}
            onCancel={onClose}
            onOk={handleOk}
            width={1000}
            okText={getOkText()}
            cancelText="Hủy"
            okButtonProps={{ disabled: selectedRowKeys.length === 0 }}
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
        </Modal>
    );
};

export default SelectApplicationModal;
