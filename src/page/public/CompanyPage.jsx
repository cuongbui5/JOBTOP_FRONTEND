import {useParams} from "react-router-dom";
import { Col, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getCompanyById} from "../../api/PublicService.js";
import JobListByCompany from "../../components/job/JobListByCompany.jsx";
import CompanyCard from "../../components/company/CompanyCard.jsx";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";



const { Text } = Typography;

const CompanyPage=()=>{

    const {handleRequest}=useApiRequest();
    const [company,setCompany]=useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchCompanyData= async (id)=>{
            await handleRequest(()=>getCompanyById(id),(res)=>{
                console.log(res);
                setCompany(res.data)
            },null,false)
        }

        if(id)

        fetchCompanyData(id);


    }, [id]);
    return (
       <ResponsiveContainer>
           <Row gutter={[32, 32]}>
               <Col xs={24} md={24}>
                   {company&&<CompanyCard company={company} />}
               </Col>

               <Col xs={24} md={24}>
                   <div>
                       <h1 style={{margin:"20px 0"}}>About {company?.name}</h1>
                       {company?.description?.split("\n").map((line,index) => (
                           <Text key={index} style={{ display: "block", marginBottom: "4px" }}>
                               {line}
                           </Text>
                       ))}

                   </div>

               </Col>


           </Row>

           <Row gutter={[16, 16]}>
               <div style={{width:"100%"}}>
                   <h1 style={{margin:"20px 0"}}>Công việc đang tuyển</h1>
                   <JobListByCompany recruiterId={company?.id}/>
               </div>


           </Row>

       </ResponsiveContainer>



    )
}
export default CompanyPage;