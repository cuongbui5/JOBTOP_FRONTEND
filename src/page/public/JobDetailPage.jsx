import {useParams} from "react-router-dom";
import JobDetailSection from "../../components/job/JobDetailSection.jsx";
import ReviewList from "../user/ReviewList.jsx";
import RatingStatistics from "../user/RatingStatistics.jsx";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import JobListAI from "../../components/job/JobListAI.jsx";
import { useState} from "react";
import ApplicationStatsChart from "../../components/application/ApplicationStatsChart.jsx";
import {Col, Row} from "antd";

const JobDetailPage=()=>{
    const { id } = useParams();
    const [jobTitle,setJobTitle]=useState("");
    window.scroll(0,0)





    return (
        <ResponsiveContainer>
            <JobDetailSection setJobTitle={setJobTitle} jobId={id}/>
            <div style={{width: "100%",marginTop: 100}}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                        <RatingStatistics jobId={id} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                        <ReviewList jobId={id} />
                    </Col>
                </Row>
            </div>





            <div style={{width: "100%", marginTop: 100}}>
                <h1>Việc làm tương tự</h1>
                <JobListAI query={jobTitle}/>

            </div>

        </ResponsiveContainer>
    )
}
//  <RelatedJobsList jobId={id}/>
export default JobDetailPage;