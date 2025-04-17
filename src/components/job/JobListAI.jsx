import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {sematicSearch} from "../../api/PublicService.js";
import {List} from "antd";
import JobCard from "./JobCard.jsx";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";

// eslint-disable-next-line react/prop-types
const JobListAI=({query})=>{
    const [jobs, setJobs] = useState([]);
    const {handleRequest}=useApiRequest();

    useEffect(() => {
        async function searchByAI() {
            await handleRequest(()=>sematicSearch(query),(res)=>{
                console.log(res)
                setJobs(res.data);
            },"search_ai")
        }

        if(query===""){
            return;
        }
        searchByAI();

    }, [query]);



    return (
        <div>
            <LoadingWrapper loadingType={"search_ai"}>
                {jobs.length>0&&<p style={{fontWeight:500}}>Tìm thấy {jobs.length} công việc liên quan đến {query}</p>}
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

        </div>





    )
}

export default JobListAI;