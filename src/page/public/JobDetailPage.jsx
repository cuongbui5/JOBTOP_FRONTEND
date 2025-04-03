import {useParams} from "react-router-dom";
import JobDetailSection from "../../components/job/JobDetailSection.jsx";
import {useEffect} from "react";
import RelatedJobsList from "../../components/job/RelatedJobsList.jsx";
import ReviewList from "../user/ReviewList.jsx";
import RatingStatistics from "../user/RatingStatistics.jsx";
import {getReviewStats} from "../../api/PublicService.js";

const sampleRatings = {
    5: 1800,
    4: 2000,
    3: 2000,
    2: 1100,
    1: 1400,

};
const JobDetailPage=()=>{
    const { id } = useParams();




    useEffect(() => {
        window.scrollTo(0, 0);


    }, [id]);
    return (
        <div style={{background:"white",display:"flex",flexWrap:"wrap",gap:"20px",padding:"20px"}}>
            <JobDetailSection jobId={id}/>
            <div style={{width: "100%", display: "flex", gap:"20px",flexDirection: "row",flexWrap:"wrap"}}>
                <div style={{ minWidth: "500px"}}>
                    <RatingStatistics jobId={id}/>
                </div>

                <div style={{flex: "1", minWidth: "500px"}}>
                    <h1 style={{
                        margin:"10px 0"
                    }}>Reviews</h1>
                    <ReviewList jobId={id}/>
                </div>


            </div>

            <div style={{width: "100%"}}>
                <h1 style={{margin: "20px 0"}}>Việc làm liên quan</h1>
                <RelatedJobsList jobId={id}/>
            </div>

        </div>
    )
}

export default JobDetailPage;