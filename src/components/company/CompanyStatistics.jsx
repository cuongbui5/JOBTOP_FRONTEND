import { Card, Col, Row, Statistic } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {  FileOutlined } from "@ant-design/icons";

const fakeData = {
    followers: 1200,
    totalJobs: 45,
    totalApplicants: 3200,
    applicantsTrend: [
        { month: "Jan", applicants: 200 },
        { month: "Feb", applicants: 300 },
        { month: "Mar", applicants: 250 },
        { month: "Apr", applicants: 400 },
        { month: "May", applicants: 500 },
        { month: "Jun", applicants: 450 },
    ],
};

const CompanyStatistics = () => {
    return (
        <Row gutter={[16, 16]}>

            <Col xs={24} md={12}>
                <Card>
                    <Statistic
                        title="Total Jobs"
                        value={fakeData.totalJobs}
                        prefix={<FileOutlined />}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card>
                    <Statistic
                        title="Total Applicants"
                        value={fakeData.totalApplicants}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Applicants Trend" style={{padding:0}}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={fakeData.applicantsTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="applicants" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        </Row>
    );
};

export default CompanyStatistics;