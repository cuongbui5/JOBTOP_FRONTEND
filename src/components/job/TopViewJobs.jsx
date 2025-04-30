import useApiRequest from "../../hooks/UseHandleApi.js";
import {useEffect, useState} from "react";

import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import {List} from "antd";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import JobCard from "./JobCard.jsx";
import {getTopJobView} from "../../api/PublicService.js";

// eslint-disable-next-line react/prop-types
const TopViewJobs=({top})=>{
    const {handleRequest}=useApiRequest();
    const [jobs,setJobs]=useState([]);
    useEffect(() => {
        const fetchJob=async ()=>{
            await handleRequest(()=>getTopJobView(top),(res)=>{
                console.log(res)
                setJobs(res.data)
            },"fetch-top-view")
        }

        fetchJob();
    }, []);

    return (
        <LoadingWrapper loadingType={"fetch-top-view"}>
            <h1>Top {top} tin tuyển dụng nhiều lượt xem nhất</h1>
            <List
                style={{marginTop: "20px"}}
                grid={{
                    gutter: 20,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                }}
                dataSource={jobs}
                renderItem={(job, index) => (
                    <List.Item>
                        <AnimationWrapper index={index}>
                            <JobCard job={job}/>
                        </AnimationWrapper>
                    </List.Item>
                )}
            />

        </LoadingWrapper>
    )
}

export default TopViewJobs;