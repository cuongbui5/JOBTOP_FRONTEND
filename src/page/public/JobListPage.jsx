import { useState, useEffect } from "react";
import JobFilter from "../../components/filter_and_seach/JobFilter.jsx";
import SearchBar from "../../components/filter_and_seach/SearchBar.jsx";



import JobBoard from "../../components/job/JobBoard.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobsView} from "../../api/PublicService.js";
import useJobStore from "../../store/JobStore.jsx";




const JobListPage = () => {
    const [jobs,setJobs]=useState([]);
    const {handleRequest}=useApiRequest();
    const {currentPage,filters,setTotalElements}=useJobStore(state => state);


    useEffect(()=>{
        const fetchJobs= async ()=>{
            await handleRequest(()=>getAllJobsView(filters,currentPage),(res)=>{
                console.log(res)
                setJobs(res.data.content);
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
            <div className={"job-container"} style={{ minHeight: "500px"}}>
                <JobBoard jobs={jobs}/>
            </div>



        </div>

    );
};

export default JobListPage;
