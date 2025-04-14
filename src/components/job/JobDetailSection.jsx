import JobPosting from "./JobPosting.jsx";
import JobDetailScroll from "./JobDetailScroll.jsx";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getJob} from "../../api/JobService.js";

const JobDetailSection=({setJobTitle,jobId,view})=>{
    const [job,setJob]=useState(null);
    const {handleRequest}=useApiRequest();

    useEffect(() => {
        const fetchJob=async (id)=>{
            await handleRequest(()=>getJob(id),(res)=>{
                setJob(res.data)
                if(setJobTitle){
                    setJobTitle(res.data?.title)
                }
                console.log(res.data)
            },"GET_JOB_DETAIL")
        }
        if(jobId){
            fetchJob(jobId)
        }

    }, [jobId]);
    const [direction, setDirection] = useState("column");
    return <div>
        <JobPosting view={view} direction={direction} job={job}/>
        <JobDetailScroll view={view}  job={job} setDirection={setDirection}  />
    </div>
}

export default JobDetailSection;