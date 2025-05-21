import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobsView, sematicSearch} from "../../api/PublicService.js";
import {List} from "antd";
import JobCard from "./JobCard.jsx";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import LoadMoreList from "../web/LoadMoreList.jsx";

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
    const fetchJobs= async (page,pageSize)=>{
        return await handleRequest(()=>getAllJobsView({},page,pageSize),(res)=>{
            //console.log(res)
           return res;

        },"GET_JOB_VIEW")
    }

    if(query===""){
        return <div>
            <LoadMoreList gridProps={{
                gutter: 20,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
            }} type={"GET_JOB_VIEW"} fetchFunction={fetchJobs} pageSize={10}/>
        </div>
    }



    return (
        <div>

            <LoadingWrapper loadingType={"search_ai"}>
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