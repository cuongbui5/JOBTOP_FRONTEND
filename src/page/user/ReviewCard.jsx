import {Card, Rate, Typography} from "antd";
import dayjs from "dayjs";


const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const ReviewCard = ({ email, rating, comment, updatedAt,interviewDate }) => {
    return (
        <div
            style={{
                maxWidth:"100%",
                padding: 16,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                background: "#fff",
                transition: "transform 0.2s ease-in-out",
            }}

        >
            {/* Tên người đánh giá */}
            <p style={{fontSize: 18, color: "#777",fontWeight:500}}>
                {email}
            </p>

            {/* Đánh giá bằng sao */}
            <div style={{margin: "8px 0"}}>
                <Rate disabled value={rating} style={{color: "#333"}}/>
            </div>

            {/* Bình luận */}
            <Text style={{fontSize: 16, color: "#444"}}>
                {comment}
            </Text>
            <div style={{marginTop: 12}}>
                <Text type="secondary" style={{fontSize: 12}}>
                 Phỏng vấn ngày   {dayjs(interviewDate).format("DD/MM/YYYY")}
                </Text>
                <br/>
                <Text type="secondary" style={{fontSize: 12}}>
                    Cập nhật lúc {dayjs(updatedAt).format("DD/MM/YYYY HH:mm")}
                </Text>
            </div>



        </div>
    );
};

export default ReviewCard;
