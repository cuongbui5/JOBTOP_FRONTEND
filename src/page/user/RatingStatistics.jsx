
import { Progress, Rate } from "antd";
import {getReviewStats} from "../../api/PublicService.js";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";

// eslint-disable-next-line react/prop-types
const RatingStatistics = ({ jobId }) => {

    const {handleRequest}=useApiRequest();
    const [ratings, setRatings] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });



    const fetchReviewStats=async (jobId)=>{
        await handleRequest(()=>getReviewStats(jobId),(res)=>{
            setRatings(res.data);
        })
    }
    useEffect(() => {
        fetchReviewStats(jobId)
    }, [jobId]);

    const ratingValues = Object.keys(ratings).map(Number).sort((a, b) => b - a);

    const totalReviews = ratingValues.reduce((sum, rating) => sum + ratings[rating], 0);
    const totalScore = ratingValues.reduce((sum, rating) => sum + rating * ratings[rating], 0);
    const averageRating = totalReviews > 0 ? totalScore / totalReviews : 0;

    return (
        <div style={{ maxWidth: "450px", padding: "20px",border:"1px solid #999",borderRadius:8}}>
            <h1 style={{ fontWeight: "bold" }}>Đánh giá chung</h1>

            <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "24px", fontWeight: "bold", marginRight: "8px" }}>
          {averageRating.toFixed(1)}
        </span>
                <Rate disabled allowHalf value={averageRating} style={{ color: "#333" }} />
            </div>

            <p style={{ fontSize: "14px", color: "gray" }}>
                Dựa trên {totalReviews.toLocaleString()} đánh giá
            </p>

            {ratingValues.map((rating) => (
                <div key={rating} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ width: "30px" }}>{rating} ★</span>
                    <Progress
                        percent={(ratings[rating] / totalReviews) * 100}
                        showInfo={false}
                        strokeColor="black"
                        style={{ flex: 1, margin: "0 10px" }}
                    />
                    <span style={{ fontSize: "14px" }}>{ratings[rating].toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default RatingStatistics;



