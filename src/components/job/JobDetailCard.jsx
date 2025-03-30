import {Card, Typography, Tag, Divider, Descriptions, Col, Space, Row} from "antd";
import RecruiterCard from "../recruiter/RecruiterCard.jsx";
import {DollarOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const JobDetailCard = ({ job }) => {
    if (!job) return <Text>Job data is not available</Text>;

    return (
        <Card style={{ width: "100%", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.1)", padding: 20 }}>
            <Title level={2} style={{ color: "#1890ff", marginBottom: 10 }}>
                {job?.title}
            </Title>

            {/* Mức lương */}
            <Title level={4} style={{ marginBottom: 5, display: "flex", alignItems: "center" }}>
                <DollarOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                Mức lương
            </Title>

            <Text strong style={{ fontSize: "1.2rem", color: "#fa541c" }}>
                {job?.salaryMin}$ - {job?.salaryMax}$
            </Text>

            <Divider style={{ marginTop: 20 }} />
                <Row gutter={24}>
                    <Col span={16}>
                        <Title level={4}>Mô tả công việc</Title>
                        <ul>
                            {job?.description}
                        </ul>
                        <Divider />
                        <Title level={4}>Thông tin chung</Title>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Yêu cầu">{job?.experienceLevelLabel} kinh nghiệm</Descriptions.Item>
                            <Descriptions.Item label="Hình thức làm việc">{job.jobTypeLabel}</Descriptions.Item>
                            <Descriptions.Item label="Địa điểm">  {job.location}</Descriptions.Item>
                            <Descriptions.Item label="Lịch làm việc">{job.workSchedule}</Descriptions.Item>
                            <Descriptions.Item label="Hạn ứng tuyển">{dayjs(job.applicationDeadline).format("DD/MM/YYYY")}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <Title level={4}>Yêu cầu ứng viên</Title>
                        <ul>
                            {job.requirements?.split("\n").map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                        <Divider />
                        <Title level={4}>Quyền lợi</Title>
                        <ul>
                            {job.benefits?.split("\n").map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                        </Col>
                        <Col span={8}>
                            <Title level={4}>Thông tin nhà tuyển dụng</Title>
                            <RecruiterCard company={job.recruiterProfile}/>
                        </Col>
                </Row>
        </Card>
    );
};

export default JobDetailCard;
