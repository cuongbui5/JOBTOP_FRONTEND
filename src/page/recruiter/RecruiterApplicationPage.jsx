import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {Button, Flex, Modal, Select, Table} from "antd";
import {
    BulbOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    EyeOutlined
} from "@ant-design/icons";
import {
    approveApplication,
    getApplicationsByRecruiter,
    rejectApplication,
    viewCvApplication
} from "../../api/ApplicationService.js";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

const { confirm } = Modal;


const { Option } = Select;

const RecruiterApplicationPage=()=>{
    const [applications,setApplications]=useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
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
        if(record.status==="PENDING"||record.status==="VIEWED"){
            await handleRequest(()=>rejectApplication(record?.id),(res)=>{
                console.log(res)
                fetchApplications(pagination.current, pagination.pageSize,viewStatus);
            },null,true)
        }

    }


    async function handleApprove(record) {
        if(record.status==="PENDING"||record.status==="VIEWED"){
            await handleRequest(()=>approveApplication(record?.id),(res)=>{
                console.log(res)
                fetchApplications(pagination.current, pagination.pageSize,viewStatus);
            },null,true)
        }

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
            title: "Tên ứng viên",
            dataIndex: "fullName",
            responsive: ["xs", "sm", "md", "lg"],
            key: "fullName",
            render: (fullName) => fullName ? fullName : "Ứng viên này chưa cập nhật profile",

        },
        {title: "Trạng thái", dataIndex: "status", key: "status"},

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
                    <Button type={"dashed"}   onClick={() => showConfirm("reject", record)}  icon={<CloseCircleOutlined/>}>Từ chối</Button>
                    <Button type={"primary"}  onClick={() => showConfirm("approve", record)}  icon={< CheckCircleOutlined/>}>Đồng ý</Button>
                    <a href={record?.resume?.link} target="_blank" rel="noopener noreferrer">
                        <Button onClick={()=>handleViewCv(record)} icon={<EyeOutlined/>}>Xem CV</Button>
                    </a>
                    <Button icon={<BulbOutlined/>}>AI nhận xét</Button>
                    <Link to={`/profile/user/${record.userId}`}>
                        <Button type={"link"}>Xem thông tin ứng viên</Button>
                    </Link>

                </Flex>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
    ];


    const fetchApplications = async (page, size,status) => {
        await handleRequest(
            () => getApplicationsByRecruiter(page,size,status),
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
        await fetchApplications(pagination.current, pagination.pageSize,viewStatus);
    };
    const viewStatusOptions = [
        { value: "PENDING", label: "Chưa xem" },
        { value: "VIEWED", label: "Đã xem" },
        { value: "APPROVED", label: "Đã đồng ý phỏng vấn" },
        { value: "REJECTED", label: "Từ chối" },
    ];






    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>
            <div style={{padding: 20}}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom:20

                }}>

                    <h1 style={{margin: "10px 0"}}>Danh sách ứng tuyển</h1>

                    <Select value={viewStatus} allowClear placeholder="Chọn trạng thái" onChange={(value) => {
                        setViewStatus(value)
                    }} style={{width: 200, marginBottom: 16}}>
                        {viewStatusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>

                </div>
                <h3>Chú ý: Nhà tuyển dụng không thể thay đổi trạng thái đơn ứng tuyển khi trạng thái hiện tại là APPROVED hoặc REJECTED </h3>

                <Table onChange={handleTableChange} rowKey="id" columns={columnsResponsive} dataSource={applications}
                       pagination={pagination}/>
            </div>


        </div>
    )
}
export default RecruiterApplicationPage;