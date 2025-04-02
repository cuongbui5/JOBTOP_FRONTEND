import {Avatar, Button, Col, Modal, notification, Row, Space, Table} from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { getAllInterviewByUser } from "../../api/InterviewScheduleService.js";
import {deleteSlotById, getAllSlotsByInterviewScheduleId} from "../../api/InterviewSlotService.js";
import ChooseApplication from "./ChooseApplication.jsx";
import {removeById} from "../../utils/helper.js";

const InterviewSchedulePage = () => {
    const [interviewSchedules, setInterviewSchedules] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobId,setJobId]=useState(null);
    const [scheduleId,setScheduleId]=useState(null);
    const { handleRequest } = useApiRequest();

    const columns = [
        { title: "Ngày phỏng vấn", dataIndex: "interviewDate", key: "interviewDate" },
        { title: "Thời gian bắt đầu", dataIndex: "startTime", key: "startTime" },
        { title: "Thời gian kết thúc", dataIndex: "endTime", key: "endTime" },
        { title: "Địa điểm", dataIndex: "officeAddress", key: "officeAddress" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusColors = {
                    SCHEDULED: "blue",
                    CANCELED_BY_RECRUITER: "red",
                    COMPLETED: "green",
                };
                return <span style={{ color: statusColors[status] }}>{status}</span>;
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Link to={`/recruiter/interview-schedule/update/${record.id}`}>
                        <Button>Cập nhật</Button>

                    </Link>
                    <Button onClick={() => fetchSlotsByInterviewScheduleId(record.id)}>Chỉnh sửa danh sách phỏng vấn</Button>



                </Space>

            ),
        },
    ];

    async function handleRemoveCandidate(id) {
        if(applicants.length===1){
            notification.error({
                message:"Cuộc phỏng vấn phải tồn tại ít nhất 1 người"
            })
            return;
        }
        await handleRequest(()=>deleteSlotById(id),(res)=>{
            console.log(res)
            setApplicants( removeById(applicants,id))

        })

    }

    const applicantColumns = [
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => <Avatar src={image} size="large" />,
            responsive: ["xs", "sm", "md", "lg", "xl"],  // Hiển thị trên tất cả các kích thước màn hình
        },
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "fullName",
            responsive: ["xs", "sm", "md", "lg", "xl"],  // Hiển thị trên tất cả các kích thước màn hình
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            responsive: ["xs", "sm", "md", "lg", "xl"],  // Hiển thị trên tất cả các kích thước màn hình
        },
        {
            title: "Tên công việc",
            dataIndex: "jobTitle",
            key: "jobTitle",
            responsive: ["xs", "sm", "md", "lg", "xl"],  // Hiển thị trên tất cả các kích thước màn hình
        },
        {
            title: "CV",
            dataIndex: "resume",
            key: "resume",
            render: (resume) => resume ? <a href={resume?.link} target="_blank" rel="noopener noreferrer">Xem CV</a> : "Không có CV",
            responsive: ["md", "lg", "xl"],  // Chỉ hiển thị từ màn hình trung bình trở lên
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button onClick={() => handleRemoveCandidate(record.id)}>
                    Loại bỏ
                </Button>
            ),
            responsive: ["sm", "md", "lg", "xl"],  // Hiển thị trên các màn hình nhỏ trở lên
        },
    ];


    const fetchSlotsByInterviewScheduleId = async (id) => {
        await handleRequest(() => getAllSlotsByInterviewScheduleId(id), (res) => {
            setApplicants(res.data || []);
            console.log(res.data)
            setJobId(res.data[0].jobId)
            setScheduleId(id)
            setIsModalOpen(true);
        });
    };

    useEffect(() => {
        const fetchInterviewScheduleByUser = async () => {
            await handleRequest(() => getAllInterviewByUser(), (res) => {
                setInterviewSchedules(res.data);
                console.log(res)
            });
        };
        fetchInterviewScheduleByUser();
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>Quản lý lịch phỏng vấn </h1>
                <Link to={"/recruiter/interview-schedule/create"}>
                    <Button type="primary">Đặt lịch phỏng vấn</Button>
                </Link>
            </div>

            <Row gutter={[40, 40]}>
                <Col xs={24} lg={24}>
                    <Table dataSource={interviewSchedules} columns={columns} rowKey="id" />
                </Col>
            </Row>

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={1000}
            >

                <h2>Danh sách ứng viên sẽ tham gia</h2>
                <Table style={{minHeight:200}} dataSource={applicants}  columns={applicantColumns} rowKey="id" pagination={false}  />

                <ChooseApplication jobId={jobId} scheduleId={scheduleId} />
            </Modal>
        </div>
    );
};

export default InterviewSchedulePage;
