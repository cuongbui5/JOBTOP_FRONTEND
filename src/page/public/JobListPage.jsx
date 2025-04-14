import { useState, useEffect } from "react";
import JobFilter from "../../components/filter_and_seach/JobFilter.jsx";
import SearchBar from "../../components/filter_and_seach/SearchBar.jsx";
import JobBoard from "../../components/job/JobBoard.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobsView, sematicSearch} from "../../api/PublicService.js";
import useJobStore from "../../store/JobStore.jsx";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";





const JobListPage = () => {
    const [jobs,setJobs]=useState(null);
    const {handleRequest}=useApiRequest();
    const {currentPage,filters,setTotalElements}=useJobStore(state => state);


    useEffect(()=>{
        const fetchJobs= async ()=>{
            await handleRequest(()=>getAllJobsView(filters,currentPage),(res)=>{
                console.log(res)
                setJobs(res.data.content||[]);
                setTotalElements(res.data.totalElements)
            },"GET_JOB_VIEW")
        }

        console.log(filters)
        window.scrollTo(0, 0);
        fetchJobs()
    },[filters,currentPage])




    return (
        <div style={{background: "white", paddingTop: "40px"}}>
            <div style={{width: "100%", textAlign: "center", background: "#fff", marginBottom: "40px",paddingInline:"20px"}}>
                <SearchBar/>
                <JobFilter/>


            </div>
            <ResponsiveContainer>
                {jobs&&<JobBoard jobs={jobs}/>}
            </ResponsiveContainer>



        </div>

    );
};

export default JobListPage;
