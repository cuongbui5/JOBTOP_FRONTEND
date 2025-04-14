import {Card, Divider, Row, Col} from "antd"
import { ClockCircleOutlined, EnvironmentOutlined, FileTextOutlined } from "@ant-design/icons"
import dayjs from "dayjs";




// eslint-disable-next-line react/prop-types
const InterviewCard = ({ interviewSchedule }) => {


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }




    return (
        <Card
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}

        >
            <div style={{ marginBottom: "16px" }}>{"getStatusTag(interviewSchedule.status)"}</div>

            <Divider style={{ margin: "12px 0" }} />

            <div
                style={{
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <Row gutter={0} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <Col
                        xs={24}
                        sm={8}
                        style={{
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                        }}
                    >
                        <div style={{ color: "#1677ff", marginBottom: "8px" }}>
                            <ClockCircleOutlined /> Ngày phỏng vấn
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "16px" }}>{formatDate(interviewSchedule?.interviewDate)}</div>
                    </Col>

                    <Col
                        xs={24}
                        sm={8}
                        style={{
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                        }}
                    >
                        <div style={{ color: "#1677ff", marginBottom: "8px" }}>
                            <ClockCircleOutlined /> Thời gian
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "16px" }}>
                            {interviewSchedule?.startTime} - {interviewSchedule?.endTime}
                        </div>
                    </Col>

                    <Col
                        xs={24}
                        sm={8}
                        style={{
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ color: "#1677ff", marginBottom: "8px" }}>
                            <EnvironmentOutlined /> Địa điểm
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "16px", textAlign: "center" }}>
                            {interviewSchedule?.officeAddress}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{ padding: "16px" }}>
                        <div style={{ color: "#1677ff", marginBottom: "8px" }}>
                            <FileTextOutlined /> Ghi chú
                        </div>
                        <div style={{ fontSize: "14px" }}>{interviewSchedule?.interviewNote}</div>
                    </Col>
                </Row>
            </div>

            <div
                style={{
                    fontSize: "12px",
                    color: "#8c8c8c",
                    marginTop: "16px",
                    textAlign: "right",
                }}
            >
                Cập nhật lúc: {dayjs(interviewSchedule?.updatedAt)}
            </div>
        </Card>
    )
}

export default InterviewCard;
