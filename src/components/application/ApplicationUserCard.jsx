import {Button, Card, Dropdown, Tag} from "antd";
import {
    ArrowRightOutlined,
    BankOutlined,
    CalendarOutlined, ClockCircleOutlined,
    EnvironmentOutlined,
    FileDoneOutlined,
    FlagOutlined,
    InfoCircleOutlined,
    MoreOutlined, StarOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import useModalStateStore from "../../store/ModalStateStore.js";
import useJobStore from "../../store/JobStore.jsx";
import dayjs from "dayjs";
import SalaryText from "../job/SalaryText.jsx";
import {getApplicationStatusLabel, getExperienceLabel, getInterviewStatusLabel} from "../../utils/helper.js";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const ApplicationUserCard=({application,openRating,setApplicationSelected})=>{
    const {setOpenReport}=useModalStateStore(state => state);
    const {setSelectedJobId}=useJobStore(state => state);
    const [showInterview, setShowInterview] = useState(false);

    const menuItems = [
        { key: "report", label: "Báo cáo", icon: <FlagOutlined /> }

    ];

    async function handleMenuClick(key) {
        if (key === "report") {
            setSelectedJobId(application?.jobId);
            setOpenReport(true);
        }

    }
    return (
            <Card
                actions={[
                    <Button
                        key="Xem lịch phỏng vấn"
                        type="text"
                        icon={<InfoCircleOutlined />}
                        onClick={() => setShowInterview(prev => !prev)}

                    >
                        {showInterview ? "Ẩn lịch phỏng vấn" : "Xem lịch phỏng vấn"}
                    </Button>,

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
                        <Link style={{color:"black"}} to={`/job-detail/${application?.jobId}`}>
                            <h2 style={{margin: 0}}>{application?.jobTitle}</h2>

                        </Link>


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
                    gap: "4px",
                    minHeight: "200px",
                }}>
                    <div style={{marginBottom: "10px"}}>
                        <Tag style={{
                            fontWeight: "500",
                            color: "#777"
                        }}>
                            <SalaryText salaryMin={application?.salaryMin} salaryMax={application?.salaryMax}
                                        size={"14px"}/>
                        </Tag>
                        <Tag style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#777"
                        }}>{getExperienceLabel(application?.experienceLevel).text}</Tag>
                    </div>
                    <p style={{fontSize: "16px"}}><BankOutlined style={{marginRight: "8px"}}/>Công
                        ty: {application.companyName}</p>
                    <p style={{fontSize: "16px"}}><EnvironmentOutlined style={{marginRight: "8px"}}/>Địa
                        điểm: {application.location}</p>
                    <p style={{fontSize: "16px"}}><FileDoneOutlined tyle={{marginRight: "8px"}}/><span
                        style={{marginLeft: "8px"}}>Trạng thái: {getApplicationStatusLabel(application?.status).text}</span>
                    </p>
                    <p style={{fontSize: "16px"}}><CalendarOutlined style={{marginRight: "8px"}}/>Đã ứng
                        tuyển: {dayjs(application.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                    <a
                        key="Xem CV"
                        href={application?.resume?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        Xem CV <ArrowRightOutlined />

                    </a>
                    {showInterview && application?.interviewSchedule && (
                        <div
                            style={{
                                marginTop: "16px",
                                padding: "16px",
                                backgroundColor: "#fafafa",
                                borderRadius: "12px",
                                border: "1px solid #e4e4e4",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3 style={{marginBottom: "8px"}}>
                                Thông tin lịch phỏng vấn
                            </h3>

                            <p>
                                <CalendarOutlined style={{marginRight: 8}}/>
                                <strong>Ngày: </strong>
                                {dayjs(application.interviewSchedule.interviewDate).format("DD/MM/YYYY")}
                            </p>

                            <p>
                                <ClockCircleOutlined style={{marginRight: 8}}/>
                                <strong>Thời
                                    gian:</strong> {application.interviewSchedule.startTime} - {application.interviewSchedule.endTime}
                            </p>

                            <p>
                                <EnvironmentOutlined style={{marginRight: 8}}/>
                                <strong>Địa điểm:</strong> {application.interviewSchedule.officeAddress}
                            </p>

                            <p>
                                <FileDoneOutlined style={{marginRight: 8}}/>
                                <strong>Ghi chú:</strong> <i>{application.interviewSchedule.interviewNote}</i>
                            </p>

                            <p>
                                <InfoCircleOutlined style={{marginRight: 8}}/>
                                <strong>Trạng thái:</strong>{" "}
                                <Tag color={getInterviewStatusLabel(application.interviewSchedule.status).color}>
                                    {getInterviewStatusLabel(application.interviewSchedule.status).text}
                                </Tag>
                            </p>
                            <div style={{marginTop: 16}}>
                                <Button
                                    icon={<StarOutlined/>}
                                    disabled={application.status !== "COMPLETED"}
                                    onClick={() => {
                                        openRating();
                                        setApplicationSelected(application);
                                    }}
                                >
                                    Đánh giá phỏng vấn
                                </Button>
                            </div>
                        </div>
                    )}


                </div>


            </Card>


    )
}

export default ApplicationUserCard;