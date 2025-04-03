import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllSlotsByUser, updateSlotStatusById} from "../../api/InterviewSlotService.js";
import {Button, Space, Table} from "antd";
import dayjs from "dayjs";
import InterviewRatingModal from "./InterviewRatingModal.jsx";

const InterviewScheduleUserPage=()=>{
    const {handleRequest}=useApiRequest();
    const [interviewSlots,setInterviewSlots]=useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [slotCurrent,setSlotCurrent]=useState(null);



    const columns = [

        {
            title: "Vị trí công việc",
            dataIndex: "jobTitle",
            key: "jobTitle",
            responsive: ["xs", "sm", "md", "lg"],
        },
        {
            title: "Ngày phỏng vấn",
            dataIndex: "interviewDate",
            key: "interviewDate",
            render: (text) => dayjs(text).format("DD/MM/YYYY"),
            responsive: ["xs", "sm", "md", "lg"],
        },
        {
            title: "Giờ bắt đầu",
            dataIndex: "startTime",
            key: "startTime",
            responsive: ["xs", "sm", "md", "lg"], // Hiển thị trên mọi màn hình
            render: (text) => text ? dayjs(text, "HH:mm:ss").format("HH:mm") : "",
        },
        {
            title: "Giờ kết thúc",
            dataIndex: "endTime",
            key: "endTime",
            responsive: ["xs", "sm", "md", "lg"],
            render: (text) => text ? dayjs(text, "HH:mm:ss").format("HH:mm") : "",
        },
        {
            title: "Địa chỉ phỏng vấn",
            dataIndex: "officeAddress",
            key: "officeAddress",
            responsive: ["sm", "md", "lg"],
        },
        /*{
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            responsive: ["md", "lg"], // Ẩn trên mobile
            render:(text)=>text||"N/A"
        },*/
        {
            title: "Cập nhật lúc",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
            responsive: ["lg"], // Chỉ hiển thị trên màn hình lớn
        },


        {
            title: "Ghi chú",
            dataIndex: "interviewNote",
            key: "interviewNote",
            responsive: ["lg"],
            render:(text)=>text||"N/A"
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                record.status === "COMPLETED" ? (
                    <Button type="primary"
                            onClick={() => {
                                handleOpen();
                                setSlotCurrent(record)
                                console.log(record)
                            }}
                    >
                        Đánh giá
                    </Button>
                ) : "N/A"
            ),
        },

    ];

    useEffect(() => {
        const fetchSlots=async ()=>{
            await handleRequest(()=>getAllSlotsByUser(),(res)=>{
                console.log(res)
                setInterviewSlots(res.data)
            },null,true)
        }
        fetchSlots();
    }, []);

    const handleOpen = () => setIsModalVisible(true);
    const handleClose = () => setIsModalVisible(false);
    const handleSubmit = (values) => {
        console.log("Submitted Rating:", values);
        handleClose();
    };

    return (
        <div style={{padding: "20px"}}>
            <h1>Lịch phỏng vấn</h1>
            <Table columns={columns} dataSource={interviewSlots} rowKey="id"/>;
            <InterviewRatingModal
                visible={isModalVisible}
                onClose={handleClose}
                slot={slotCurrent}
            />
        </div>
    )
}

export default InterviewScheduleUserPage;