import {useParams} from "react-router-dom";
import JobDetailSection from "../../components/job/JobDetailSection.jsx";
import {useEffect} from "react";
import RelatedJobsList from "../../components/job/RelatedJobsList.jsx";

const JobDetailPage=()=>{
    const { id } = useParams();


    useEffect(() => {
        window.scrollTo(0, 0);

    }, [id]);
    return (
        <div style={{background:"white",display:"flex",flexWrap:"wrap",gap:"20px",padding:"20px",justifyContent:"center"}}>
            <JobDetailSection jobId={id}/>
            <div style={{width:"100%"}}>
                <h1 style={{fontSize: "28px",margin:"20px 0"}}>Related Jobs</h1>
                <RelatedJobsList jobId={id}/>
            </div>

        </div>
    )
}

export default JobDetailPage;