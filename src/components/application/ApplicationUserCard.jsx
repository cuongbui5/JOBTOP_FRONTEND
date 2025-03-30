import { Card, Dropdown, Modal, Tag} from "antd";

import {
     BankOutlined,
    CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined,
    EyeOutlined, FileDoneOutlined,
    FileTextOutlined,
    FlagOutlined, InfoCircleOutlined, MessageOutlined,
    MoreOutlined,
    UndoOutlined,
} from "@ant-design/icons";
import {useState} from "react";
import { useNavigate} from "react-router-dom";
import useModalStateStore from "../../store/ModalStateStore.js";
import useJobStore from "../../store/JobStore.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";


import dayjs from "dayjs";
import SalaryText from "../job/SalaryText.jsx";

// eslint-disable-next-line react/prop-types
const ApplicationUserCard=({application})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setOpenReport}=useModalStateStore(state => state);
    const {setSelectedJobId}=useJobStore(state => state);

    const navigate=useNavigate();
    const menuItems = [
        { key: "view", label: "Xem chi tiết công việc", icon: <EyeOutlined /> },
        { key: "report", label: "Báo cáo", icon: <FlagOutlined /> },



    ];


    async function handleMenuClick(key) {
        if (key === "view") {
            navigate(`/job-detail/${application?.jobId}`)
        } else if (key === "report") {
            setSelectedJobId(application?.jobId);
            setOpenReport(true);
        }

    }
    return (
        <>
            <Card
                actions={[
                    <div key="Xem chi tiết" onClick={() => setIsModalOpen(true)}>
                        <InfoCircleOutlined/> Xem chi tiết
                    </div>
                    ,
                    <div key="Nhắn tin" onClick={() => setIsModalOpen(true)}>
                        <MessageOutlined/> Nhắn tin
                    </div>
                    ,
                    <a key="Xem CV" href={application?.resume?.link} target="_blank" rel="noopener noreferrer">
                        <EyeOutlined/> Xem CV
                    </a>


                ]}
                style={{
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",

                }}
                title={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            <h2 style={{margin: 0}}>{application?.jobTitle}</h2>
                            <Tag style={{
                                fontWeight: "500",
                                color: "#777"
                            }}>
                                <SalaryText salaryMin={application?.salaryMin} salaryMax={application?.salaryMax} size={"14px"}/>
                            </Tag>
                            <Tag style={{fontSize: "14px", fontWeight: "500", color: "#777"}}>{application?.experienceLevel}</Tag>
                        </div>



                        <Dropdown menu={{
                            items: menuItems,
                            onClick: ({key}) => handleMenuClick(key)
                        }} trigger={["click"]}>
                            <MoreOutlined style={{fontSize: "large", cursor: "pointer"}}/>
                        </Dropdown>
                    </div>

                }
            >

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }}>
                    <p style={{fontSize: "16px"}}><BankOutlined  style={{marginRight: "8px"}}/>Công ty: {application.companyName}</p>
                    <p style={{fontSize: "16px"}}><EnvironmentOutlined style={{marginRight: "8px"}}/>Địa
                        điểm: {application.location}</p>
                    <p style={{fontSize: "16px"}}><FileDoneOutlined tyle={{marginRight: "8px"}}/><span style={{marginLeft: "8px"}}>Trạng thái: {application?.status}</span>
                    </p>
                    <p style={{fontSize: "16px"}}><CalendarOutlined style={{marginRight: "8px"}}/>Đã ứng
                        tuyển: {dayjs(application.createdAt).format("DD/MM/YYYY HH:mm")}</p>


                </div>

            </Card>
            <Modal
                title="Chi tiết ứng tuyển"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {/* Thời gian phỏng vấn */}
                <div style={{display: "flex", flexDirection: "column", marginBottom: 10, gap: "2px"}}>
                    <p style={{fontSize: "16px"}}>
                        <CalendarOutlined style={{marginRight: 5}}/>Thời gian phỏng vấn:
                    </p>
                    <p style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginLeft: "30px"
                    }}>
                        {application?.interviewTime
                            ? new Date(application.interviewTime).toLocaleString()
                            : "Chưa có thông tin"}
                    </p>
                </div>


                <div style={{display: "flex", flexDirection: "column", marginBottom: 10, gap: "2px"}}>
                    <p style={{fontSize: "16px"}}>
                        <FileTextOutlined style={{marginRight: 5}}/>Ghi chú của nhà tuyển dụng:
                    </p>
                    <p style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginLeft: "30px"
                    }}>
                        {application?.interviewNote
                            ? application.interviewNote
                            : "Chưa có thông tin"}
                    </p>
                </div>

                <div style={{display: "flex", flexDirection: "column", marginBottom: 10, gap: "2px"}}>
                    <p style={{fontSize: "16px"}}>
                        <EnvironmentOutlined style={{marginRight: 5}}/>Địa điểm phỏng vấn:
                    </p>
                    <p style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginLeft: "30px"
                    }}>
                        {application?.officeAddress
                            ? application.officeAddress
                            : "Chưa có thông tin"}
                    </p>
                </div>

                <div style={{display: "flex", flexDirection: "column", marginBottom: 10, gap: "2px"}}>
                    <p style={{fontSize: "16px"}}>
                        <ClockCircleOutlined  style={{marginRight: 5}}/>Được cập nhật lúc:
                    </p>
                    <p style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        marginLeft: "30px"
                    }}>
                        {application?.updatedAt
                            ? new Date(application.updatedAt).toLocaleString()
                            : "Chưa có thông tin"}
                    </p>
                </div>


            </Modal>
        </>

    )
}

export default ApplicationUserCard;