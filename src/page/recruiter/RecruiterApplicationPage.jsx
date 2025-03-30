import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {Button, Flex, Form, Input, Modal, Select, Table} from "antd";
import {BulbOutlined, CloseCircleOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {getApplicationsByRecruiter, viewCvApplication} from "../../api/ApplicationService.js";
import dayjs from "dayjs";
import {Link} from "react-router-dom";



const { Option } = Select;

const RecruiterApplicationPage=()=>{
    const [applications,setApplications]=useState(null);
    const [applicationCurrent,setApplicationCurrent]=useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
    const [viewStatus, setViewStatus] = useState(null);




    const {handleRequest}=useHandleApi()


    async function handleViewCv(application) {
        console.log(application)
        if(application.status==="VIEWED"){
            return;
        }

        await handleRequest(()=>viewCvApplication(application?.id),(res)=>{
            console.log(res)
        })
    }

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
                        <Button onClick={()=>handleViewCv(record)} icon={<EyeOutlined/>}>Xem CV</Button>
                    </a>
                    <Link to={`/profile/user/${record.userId}`}>
                        <Button icon={<EyeOutlined/>}>Xem thông tin ứng viên</Button>
                    </Link>


                    <Button icon={<BulbOutlined/>}>AI nhận xét</Button>
                    <Button icon={<CloseCircleOutlined/>}>Từ chối</Button>
                    <Button icon={<EditOutlined/>} onClick={() => openDetailModal(record)}>Đặt lịch phỏng vấn</Button>


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
    const openDetailModal = (record) => {
        setApplicationCurrent(record);

        setModalVisible(true);
    };

    // Khi đóng modal
    const closeDetailModal = () => {
        setApplicationCurrent(null);
        setModalVisible(false);
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
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <h1 style={{margin: "10px 0"}}>Danh sách ứng tuyển</h1>
                    <Select  value={viewStatus} allowClear  placeholder="Chọn trạng thái" onChange={(value)=>{
                        setViewStatus(value)
                    }} style={{ width: 200, marginBottom: 16 }}>
                        {viewStatusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>

                </div>

                <Table onChange={handleTableChange} rowKey="id" columns={columnsResponsive} dataSource={applications} pagination={pagination}   />
            </div>
            <Modal
                title="Đặt lịch phỏng vấn"
                open={modalVisible}
                onCancel={closeDetailModal}

                footer={[
                    <Button key="close" onClick={closeDetailModal}>Đóng</Button>
                ]}
            >
                <Form layout="vertical">

                    <Form.Item label="Địa chỉ phỏng vấn" name="officeAddress">
                        <Input placeholder="Nhập địa chỉ văn phòng" />
                    </Form.Item>
                    <Form.Item label="Thời gian phỏng vấn" name="interviewTime">
                        <Input placeholder="Nhập thời gian phỏng vấn" />
                    </Form.Item>
                    <Form.Item label="Ghi chú phỏng vấn" name="interviewNote">
                        <Input placeholder="Nhập ghi chú phỏng vấn" />
                    </Form.Item>
                </Form>


            </Modal>


        </div>
    )
}
export default RecruiterApplicationPage;