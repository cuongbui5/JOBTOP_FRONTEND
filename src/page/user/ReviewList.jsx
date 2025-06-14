
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllReviewByJobId} from "../../api/PublicService.js";
import {Button, Empty, List, Rate, Typography} from "antd";
import dayjs from "dayjs";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";



const { Text } = Typography;
// eslint-disable-next-line react/prop-types
const ReviewList = ({jobId}) => {
    const {handleRequest}=useApiRequest();
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0);
    const [reviews,setReviews]=useState([]);
    const fetchReviews = async (page, isLoadMore = false) => {
        await handleRequest(() => getAllReviewByJobId(jobId, page,1), (res) => {
            console.log(res);
            if (isLoadMore) {
                setReviews((prevState) => [...prevState, ...res.data.content]); // Giữ lại danh sách cũ
            } else {
                setReviews(res.data.content);
            }

            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        });


    };



    useEffect(() => {

        if(jobId) {

            fetchReviews(1);

        }
    }, [jobId]);


    if(reviews.length===0){
        return  <Empty description="Chưa có đánh giá nào" style={{ marginTop: 32 }} />
    }



    return (
        <div style={{width: "100%"}}>
            <h1 style={{marginBottom: "20px"}}>Reviews</h1>
            <List
                style={{ maxHeight: "800px", overflowY: "auto" }}
                itemLayout="vertical"
                dataSource={reviews}
                renderItem={(item, index) => (
                    <AnimationWrapper index={index} animationType={"fadeInLeft"}>
                        <List.Item
                            style={{
                                minHeight: 100,
                                maxWidth: "100%",
                                borderBottom: "1px solid #e8e8e8",
                                padding: "16px 0",
                            }}>
                            <List.Item.Meta
                                avatar={
                                    <div style={{textAlign: "center"}}>
                                        <h1 style={{fontSize:24, fontWeight: "500"}}>{item.rating}.0</h1>
                                        <Rate disabled value={item.rating} style={{color: "#555", fontSize: 10}}/>
                                    </div>

                                }
                                title={<h3 style={{fontWeight: 500, fontSize: "18px"}}>Phỏng vấn
                                    ngày {dayjs(item.interviewDate).format("DD/MM/YYYY")}</h3>}
                                description={
                                    <p style={{fontSize: 14, color: "#555"}}>
                                        {item.email} - {dayjs(item.updatedAt).format("[Ngày] D [tháng] M [năm] YYYY")}
                                    </p>
                                }
                            />
                            <Text style={{fontSize: 16, color: "black"}}>{item.comment}</Text>


                        </List.Item>
                    </AnimationWrapper>
                )}
            />


            <div>
                {currentPage < totalPages && (
                    <div style={{textAlign: "center", marginTop: 20}}>
                        <Button

                            size={"large"}
                            onClick={() => fetchReviews(currentPage + 1, true)}

                        >
                            Tải thêm...

                        </Button>
                    </div>
                )}
            </div>


        </div>
    );
};

export default ReviewList;
