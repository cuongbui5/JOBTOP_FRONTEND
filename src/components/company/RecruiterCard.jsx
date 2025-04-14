import {Card, Image} from "antd";
import { UserOutlined, EnvironmentOutlined, AppstoreOutlined } from "@ant-design/icons";

const RecruiterCard = ({ company }) => {
    return (
        <Card style={{ width: 350, borderRadius: 10, padding: 16, border: "1px solid #ddd" }}>
            {/* Logo & Company Name */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>

                <img width={50}  height={50} src={company.companyLogo|| "/images/company-logo-default.jpg"}/>

                <div style={{ fontWeight: "bold", fontSize: 16,marginLeft:"10px" }}>{company.companyName}</div>
            </div>

            {/* Company Information */}
            <div style={{ fontSize: 14, color: "#555" }}>
                <p style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                    <UserOutlined style={{ marginRight: 8, color: "#888" }} />
                    Quy mô: {company.companySize}
                </p>
                <p style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                    <AppstoreOutlined style={{ marginRight: 8, color: "#888" }} />
                    Lĩnh vực: {company.category.name}
                </p>
                <p style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                    <EnvironmentOutlined style={{ marginRight: 8, color: "#888" }} />
                    Địa điểm: {company.companyAddress}
                </p>
            </div>

            {/* Link to company page */}
            <a
                href={company.companyWebsite}
                style={{
                    display: "block",
                    marginTop: 12,
                    color: "green",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Xem trang công ty →
            </a>
        </Card>
    );
};

export default RecruiterCard;
