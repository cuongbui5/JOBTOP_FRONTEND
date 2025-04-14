import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {Button, Flex, Modal, Select, Table, Tag} from "antd";
import {
    BulbOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    EyeOutlined
} from "@ant-design/icons";
import {
    approveApplication,
    getApplicationsByCompany,
    rejectApplication,
    viewCvApplication
} from "../../api/ApplicationService.js";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {getApplicationStatusLabel} from "../../utils/helper.js";

const { confirm } = Modal;


const { Option } = Select;

const ApplicationPage=()=>{
    const [applications,setApplications]=useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [viewStatus, setViewStatus] = useState(null);
    const {handleRequest}=useHandleApi();





    async function handleViewCv(application) {
        console.log(application)
        if(application.status==="VIEWED"){
            return;
        }

        await handleRequest(()=>viewCvApplication(application?.id),(res)=>{
            console.log(res)
        })
    }

    async function handleReject(record) {
        await handleRequest(()=>rejectApplication(record?.id),(res)=>{
            console.log(res)
            fetchApplications(pagination.current, pagination.pageSize,viewStatus);
        },null,true)

    }


    async function handleApprove(record) {
        await handleRequest(()=>approveApplication(record?.id),(res)=>{
            console.log(res)
            fetchApplications(pagination.current, pagination.pageSize,viewStatus);
        },null,true)

    }

    const showConfirm = (action, record) => {
        confirm({
            title: `Bạn có chắc chắn muốn ${action === "approve" ? "đồng ý" : "từ chối"} ứng viên này không?`,
            icon: <ExclamationCircleOutlined />,
            content: "Hành động này không thể hoàn tác!",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async ()=> {
                if (action === "approve") {
                     await handleApprove(record);
                } else {
                    await handleReject(record);
                }
            },
        });
    };

    const columnsResponsive = [
        {title: "Id", dataIndex: "id", key: "id"},
        {
            title: "Tên công việc",
            dataIndex: "jobTitle",
            key: "jobTitle",
            responsive: ["xs", "sm", "md", "lg", "xl"] ,
            render: (_, record) => (
                <Link to={`/job-detail/${record.jobId}`}>{record.jobTitle}</Link>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            responsive: ["xs", "sm", "md", "lg"],
            key: "email",


        },
        {title: "Trạng thái", dataIndex: "status", key: "status",
            render: (status) => {
                const {text,color}=getApplicationStatusLabel(status)
                return <Tag color={color}>{text}</Tag>;
            }
        },

        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdAt",
            key: "createdAt",
            responsive: ["md", "lg", "xl"],
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },
        { title: "Hạn nộp hồ sơ", dataIndex: "applicationDeadline", key: "applicationDeadline", responsive: ["lg", "xl"] },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Flex gap="small" wrap="wrap">
                    <a href={record?.resume?.link} target="_blank" rel="noopener noreferrer">
                        <Button type={"link"} onClick={() => handleViewCv(record)} icon={<EyeOutlined/>}>Xem CV</Button>
                    </a>
                    <Button onClick={() => showConfirm("reject", record)} icon={<CloseCircleOutlined/>}>Từ chối</Button>
                    <Button type={"primary"} onClick={() => showConfirm("approve", record)} icon={< CheckCircleOutlined/>}>Đồng ý</Button>

                </Flex>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
    ];


    const fetchApplications = async (page, size, status) => {
        await handleRequest(
            () => getApplicationsByCompany(page,size,status),
            (res) => {
                console.log(res);
                setApplications(res.data.content);
                setPagination({
                    current: res.data.currentPage,
                    pageSize: size,
                    total: res.data.totalElements, // Tổng số bản ghi từ API
                });
            }
        );
    };




    useEffect(() => {
        fetchApplications(pagination.current, pagination.pageSize,viewStatus);
    }, [viewStatus]);

    const handleTableChange =async (pagination) => {
        console.log(pagination)
        await fetchApplications(pagination.current, pagination.pageSize,viewStatus);
    };
    const viewStatusOptions = [
        { value: "PENDING", label: "Chưa xem" },
        { value: "VIEWED", label: "Đã xem" },
        { value: "APPROVED", label: "Được chấp nhận" },
        { value: "REJECTED", label: "Từ chối" },
        { value: "ADDED_TO_INTERVIEW", label: "Đã thêm vào phỏng vấn" },
        { value: "NO_SHOW", label: "Vắng mặt khi phỏng vấn" },
        { value: "COMPLETED", label: "Đã hoàn thành" },
    ];






    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>
            <div style={{padding: 20}}>
                <h1 style={{margin: "10px 0"}}>Danh sách ứng tuyển</h1>
                <div style={{display:"flex",flexDirection:"column",alignItems:"end"}}>
                    <Select value={viewStatus} allowClear placeholder="Chọn trạng thái" onChange={(value) => {
                        setViewStatus(value)
                    }} style={{width: 200, marginBottom: 16}}>
                        {viewStatusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                    <Table
                        style={{width:"100%"}}
                        scroll={{x: "max-content"}}
                        onChange={handleTableChange} rowKey="id" columns={columnsResponsive} dataSource={applications}
                        pagination={pagination}/>

                </div>

            </div>


        </div>
    )
}
export default ApplicationPage;