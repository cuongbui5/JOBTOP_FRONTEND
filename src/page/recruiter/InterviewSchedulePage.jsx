import {Button, Space, Table, Tag} from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllInterviewByCompany} from "../../api/InterviewScheduleService.js";
import { getInterviewStatusLabel} from "../../utils/helper.js";
import SelectApplicationModal from "./SelectApplicationModal.jsx";


const InterviewSchedulePage = () => {
    const [interviewSchedules, setInterviewSchedules] = useState(null);
    const { handleRequest } = useApiRequest();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            responsive: ["xs", "sm", "md", "lg"],

        },
        { title: "Ngày phỏng vấn", dataIndex: "interviewDate", key: "interviewDate" },
        { title: "Thời gian bắt đầu", dataIndex: "startTime", key: "startTime" },
        { title: "Thời gian kết thúc", dataIndex: "endTime", key: "endTime" },
        { title: "Địa điểm", dataIndex: "officeAddress", key: "officeAddress" },
        { title: "Ghi chú", dataIndex: "interviewNote", key: "interviewNote" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const {text,color}=getInterviewStatusLabel(status)
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Link to={`/recruiter/interview-schedule/edit/${record.id}`}>
                        <Button type={"primary"}>Cập nhật</Button>
                    </Link>
                    <Button onClick={async () =>{
                        setSelectedSchedule(record);
                        setIsModalOpen(true);
                    }}
                    >Thêm ứng viên</Button>

                </Space>

            ),
        },
    ];






    useEffect(() => {
        const fetchInterviewScheduleByCompany = async () => {
            await handleRequest(() => getAllInterviewByCompany(), (res) => {
                setInterviewSchedules(res.data);
                console.log(res)
            });
        };
        fetchInterviewScheduleByCompany();
    }, []);

    return (
        <div style={{padding: "20px",textAlign:"center"}}>
            <h1 style={{margin: 20}}>Quản lý lịch phỏng vấn </h1>
            <div style={{display: "flex",flexDirection:"column", alignItems: "flex-end",gap:20}}>
                <Link to={"/recruiter/interview-schedule/create"}>
                    <Button style={{borderRadius:0}}  size={"large"} type="primary">Đặt lịch phỏng vấn</Button>
                </Link>

                <Table style={{width:"100%"}} scroll={{x: "max-content"}} dataSource={interviewSchedules} columns={columns} rowKey="id"/>
            </div>

            {setSelectedSchedule&& <SelectApplicationModal
                schedule={selectedSchedule}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}

            />}






        </div>
    );
};

export default InterviewSchedulePage;
