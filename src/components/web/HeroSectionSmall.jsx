import { motion } from "framer-motion";
import {useLocation} from "react-router-dom";


const HeroSectionSmall = () => {
    const location = useLocation();
    const contentMap = {
        "/recruiter-profile": "Quản lý hồ sơ nhà tuyển dụng",
        "/recruiter-job": "Quản lý danh sách công việc",
        "/job/create": "Tạo bài đăng tuyển dụng mới",
    };
    let content = contentMap[location.pathname] || "Khám phá trang web của chúng tôi";
    if (location.pathname.startsWith("/job/edit/")) {
        content = "Chỉnh sửa bài đăng tuyển dụng";
    }


    return (
        <div
            style={{
                position: "relative",
                minHeight: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >

            <img
                src="/images/login-bg.webp"
                alt="Background"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Đảm bảo ảnh phủ kín vùng div
                }}
            />

            {/* Overlay tối */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center", // Căn giữa theo chiều ngang
                    alignItems: "center", // Căn giữa theo chiều dọc
                }}
            >
                {/* Tiêu đề với hiệu ứng xuất hiện từ dưới lên */}
                <motion.p
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeOut"}}
                    style={{
                        color: "white",
                        maxWidth: "800px",
                        fontWeight: "bold",
                        fontSize: "40px",
                        textAlign: "center", // Căn giữa văn bản
                        padding: "20px",
                    }}
                >
                    {content}
                </motion.p>
            </div>
        </div>
    );
};

export default HeroSectionSmall;
