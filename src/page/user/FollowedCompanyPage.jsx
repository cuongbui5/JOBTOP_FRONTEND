import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getFollowedCompanies} from "../../api/FollowService.js";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import {List} from "antd";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";
import JobCard from "../../components/job/JobCard.jsx";
import CompanyCard from "../../components/company/CompanyCard.jsx";

const FollowedCompanyPage=()=>{
    const [companies,setCompanies]=useState([]);
    const {handleRequest}=useApiRequest();
    useEffect(()=>{
        const fetchFollowedCompanies= async ()=>{
            await handleRequest(()=>getFollowedCompanies(),(res)=>{
                console.log(res);
                setCompanies(res.data);
            },"followed-companies",false)

        }

        fetchFollowedCompanies()
    },[])
    return (
        <div style={{
            padding: "40px 20px"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "30px",
                flexWrap: "wrap",
                gap: 20

            }}>
                <h1 style={{marginLeft: "8px"}}>Công ty đã theo dõi</h1>


            </div>
            <LoadingWrapper loadingType={"saved-jobs"}>
                <List

                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 4,
                    }}
                    dataSource={companies}
                    renderItem={(company, index) => (

                        <List.Item>
                            <AnimationWrapper index={index}>
                                <CompanyCard company={company} noEffect={true}/>
                            </AnimationWrapper>
                        </List.Item>
                    )}
                />


            </LoadingWrapper>


        </div>
    )
}

export default FollowedCompanyPage;