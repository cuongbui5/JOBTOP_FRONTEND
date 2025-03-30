import {useParams} from "react-router-dom";
import { Col, Row, Typography} from "antd";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getRecruiterProfileById} from "../../api/PublicService.js";
import JobListByCompany from "../../components/job/JobListByCompany.jsx";
import CompanyCard from "../../components/recruiter/CompanyCard.jsx";
import CompanyStatistics from "../../components/recruiter/CompanyStatistics.jsx";


const { Text } = Typography;

const RecruiterProfileDetailPage=()=>{
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const {handleRequest}=useApiRequest();
    const [profile,setProfile]=useState(null)

    useEffect(() => {
        const fetchCompanyData= async (id)=>{
            await handleRequest(()=>getRecruiterProfileById(id),(res)=>{
                console.log(res);
                setProfile(res.data)
            },null,false)
        }


        fetchCompanyData(id);


    }, [id]);
    return (
        <div style={{
            padding: isMobile?"20px 20px":"20px 100px",

        }}>
            <Row gutter={[32, 32]}>

                <Col xs={24}  md={24} lg={16}>
                    <div>
                        <h1 style={{margin:"20px 0"}}>About {profile?.companyName}</h1>
                        {profile?.description?.split("\n").map((line, index) => (
                            <Text key={index} style={{ display: "block", marginBottom: "4px" }}>
                                {line}
                            </Text>
                        ))}

                    </div>

                </Col>
                <Col xs={24} md={24} lg={8}>
                    <div style={{ }}>
                        <CompanyCard company={profile} />

                    </div>
                </Col>

            </Row>
            <Row gutter={[16, 16]}>
                <div style={{width:"100%"}}>
                    <h1 style={{margin:"20px 0"}}>Thống kê</h1>
                   <CompanyStatistics/>
                </div>


            </Row>
            <Row gutter={[16, 16]}>
                <div style={{width:"100%"}}>
                    <h1 style={{margin:"20px 0"}}>Công việc đang tuyển</h1>
                    <JobListByCompany recruiterId={profile?.id}/>
                </div>


            </Row>
        </div>

    )
}
export default RecruiterProfileDetailPage;