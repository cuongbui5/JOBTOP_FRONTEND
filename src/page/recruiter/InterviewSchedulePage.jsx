import {Avatar, Button, Col, Modal, notification, Row, Space, Table} from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { getAllInterviewByUser } from "../../api/InterviewScheduleService.js";
import {
    deleteSlotById,
    getAllSlotsByInterviewScheduleId,
    updateSlotStatusById
} from "../../api/InterviewSlotService.js";
import ChooseApplication from "./ChooseApplication.jsx";
import {removeById} from "../../utils/helper.js";
import {getApplicationsByFilter} from "../../api/ApplicationService.js";

const InterviewSchedulePage = () => {
    const [interviewSchedules, setInterviewSchedules] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobId,setJobId]=useState(null);
    const [schedule,setSchedule]=useState(null);
    const [approvedApplications,setApprovedApplications]=useState(null);
    const { handleRequest } = useApiRequest();

    const fetchApproveApplication = async (id) => {
        await handleRequest(() => getApplicationsByFilter(id, "APPROVED"), (res) => {
            setApprovedApplications(res.data);
        });
    };
    useEffect(() => {
        if(jobId){
            fetchApproveApplication(jobId);
        }

    }, [jobId]);


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
                    <Button onClick={async () =>{
                        await fetchSlotsByInterviewSchedule(record)
                        setIsModalOpen(true)
                    }}>Chỉnh sửa danh sách phỏng vấn</Button>



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
            fetchApproveApplication(jobId)

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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            responsive: ["md", "lg", "xl"],  // Chỉ hiển thị từ màn hình trung bình trở lên
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>


                    {schedule?.status==="COMPLETED"? <Button onClick={async () => {
                        await handleRequest(()=>updateSlotStatusById(record.id,{status:"NO_SHOW"}),(res)=>{
                            console.log(res);
                            fetchSlotsByInterviewSchedule(schedule)
                        })
                    }}>
                        Người này vắng trong phỏng vấn
                    </Button>: <Button onClick={() => handleRemoveCandidate(record.id)}>
                        Loại bỏ
                    </Button>

                    }

                </>

            ),
            responsive: ["sm", "md", "lg", "xl"],  // Hiển thị trên các màn hình nhỏ trở lên
        },
    ];


    const fetchSlotsByInterviewSchedule = async (schedule) => {
        await handleRequest(() => getAllSlotsByInterviewScheduleId(schedule.id), (res) => {
            setApplicants(res.data);
            console.log(res.data)
            setJobId(res.data[0].jobId)
            setSchedule(schedule)

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
                <h1 style={{marginBottom:20}}>Quản lý lịch phỏng vấn </h1>
                <Link to={"/recruiter/interview-schedule/create"}>
                    <Button type="primary">Đặt lịch phỏng vấn</Button>
                </Link>
            </div>
            <p>Nếu có ứng viên vắng mặt trong cuộc phỏng vấn bạn có thể báo cáo bằng cách cập nhật danh sách phỏng vấn</p>

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

                <h2>{schedule?.status==="COMPLETED"?"Danh sách ứng viên tham gia":"Danh sách ứng viên sẽ tham gia"}</h2>
                <Table style={{minHeight:200}} dataSource={applicants}  columns={applicantColumns} rowKey="id" pagination={false}  />

                {
                    schedule?.status!=="COMPLETED"&&
                    <ChooseApplication fetchSlotsAgain={()=>fetchSlotsByInterviewSchedule(schedule)} approvedApplications={approvedApplications} setApprovedApplications={setApprovedApplications} scheduleId={schedule?.id} />

                }
            </Modal>
        </div>
    );
};

export default InterviewSchedulePage;
