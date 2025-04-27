// components/EmployerDashboardStats.jsx
import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getCompanyDashboard} from "../../api/CompanyDashboardService.js";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";


const EmployerDashboardStats = () => {
    const [data, setData] = useState(null);
    const {handleRequest}=useApiRequest();


    useEffect(() => {


        const fetchData = async () => {
           await handleRequest(()=>getCompanyDashboard(),(res)=>{
               console.log(res);
               setData(res.data)
           },"load-dashboard")
        };

        fetchData();
    }, []);



    return (
        <LoadingWrapper loadingType={"load-dashboard"}>
            <Row gutter={16}>
                <Col span={6}>
                    <Card style={{ borderRadius: "12px" }}>
                        <Statistic title="Tổng bài đăng tuyển" value={data?.totalJobs} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ borderRadius: "12px" }}>
                        <Statistic title="Bài đăng đang hoạt động" value={data?.activeJobs} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ borderRadius: "12px" }}>
                        <Statistic title="Tổng lượt ứng tuyển" value={data?.totalApplications} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ borderRadius: "12px" }}>
                        <Statistic title="Ứng tuyển đã duyệt" value={data?.approvedApplications} />
                    </Card>
                </Col>
            </Row>
        </LoadingWrapper>
    );
};

export default EmployerDashboardStats;
