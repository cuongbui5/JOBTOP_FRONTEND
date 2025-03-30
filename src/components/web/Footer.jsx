import {Layout, Row, Col, Image} from "antd";
import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ width:"100%", background: "#001529", color: "white", padding: "80px 40px" }}>
            <Row gutter={[16, 16]} justify="center">
                {/* Cột 1 - Logo & Giới thiệu */}
                <Col xs={24} sm={12} md={8} lg={6}>
                    <div style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#00AFC1",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Image src={"/images/tie.png"} preview={false} width={25}/>
                        JOB<span style={{color: "#2D3E50"}}>TOP</span>
                    </div>
                    <p style={{width:"250px",marginTop:"10px"}}>Website tuyển dụng hàng đầu, kết nối nhà tuyển dụng và ứng viên.</p>
                </Col>

                {/* Cột 2 - Điều hướng nhanh */}
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"8px"

                    }}>
                        <h4>Điều hướng</h4>
                        <p>Giới thiệu</p>
                        <p>Liên hệ</p>
                        <p>Tuyển dụng</p>

                    </div>

                </Col>

                {/* Cột 3 - Hỗ trợ */}
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"

                    }}>
                        <h4>Hỗ trợ</h4>
                        <p>Câu hỏi thường gặp</p>
                        <p>Điều khoản sử dụng</p>
                        <p>Chính sách bảo mật</p>
                    </div>
                </Col>

                {/* Cột 4 - Liên hệ */}
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"

                    }}>
                        <h4>Liên hệ</h4>
                        <p>Email: support@jobtop.com</p>
                        <p>Điện thoại: 0123-456-789</p>
                    </div>
                </Col>

                {/* Cột 5 - Mạng xã hội */}
                <Col xs={24} sm={12} md={8} lg={4}>
                    <h4>Mạng xã hội</h4>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        marginTop:"8px"

                    }}>

                        <FacebookOutlined style={{fontSize: "24px",  cursor: "pointer"}}/>
                        <LinkedinOutlined style={{fontSize: "24px", cursor: "pointer"}}/>
                        <TwitterOutlined style={{fontSize: "24px", cursor: "pointer"}}/>
                    </div>
                </Col>
            </Row>
        </Footer>
);
};

export default CustomFooter;
