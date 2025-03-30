import { RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
            {/* Ảnh nền */}
            <img
                src="/images/hero-bg.jpeg"
                alt="Hero Background"
                style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,

                }}
            />

            {/* Lớp phủ màu tối */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {/* Tiêu đề với hiệu ứng xuất hiện từ dưới lên */}
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        color: "white",
                        maxWidth: "80%",
                        fontWeight: "bold",
                        fontSize: "40px",
                        paddingLeft:"50px"

                    }}
                >
                    Tìm kiếm công việc yêu thích của bạn một cách dễ dàng.
                </motion.p>

                {/* Mô tả với hiệu ứng mờ dần */}


                <Link to={"/home/jobs"}>
                    <motion.button
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8, delay: 0.6, ease: "easeOut"}}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 24px",
                            marginTop:"20px",
                            marginLeft: "50px",
                            fontSize: "25px",
                            fontWeight: "bold",
                            color: "white",
                            backgroundColor: "#007bff",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0px 4px 10px rgba(0, 123, 255, 0.3)",
                        }}
                    >
                        Xem ngay
                    </motion.button>
                </Link>

            </div>
        </div>
    );
};

export default HeroSection;
