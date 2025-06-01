import {Card, Space} from "antd";
import {AppstoreOutlined, EnvironmentOutlined, GlobalOutlined, LinkOutlined, TeamOutlined} from "@ant-design/icons";

import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CompanyCard = ({ company }) => {

    return (
        <Card
            style={{position:"relative", width: "100%", minHeight:550,borderRadius: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}

            cover={
                <div style={{height: 240, background: "#f5f5f5"}}>
                    <img src={"/images/bg-company.jpg"} alt="Logo" style={{  width: "100%",
                        height: "100%",
                        objectFit: "cover"}}
                    />
                </div>
            }
        >
            <img style={{
                padding:"5px",
                position:"absolute",
                top:200,
                right:30,
                borderRadius:"8px",
                background:"white",
                border:"3px solid #999",
                width:"65px",
                height:"60px"
            }} src={company?.logo||"/images/company-logo-default.jpg"}  alt={"logo"}/>


            <Link style={{color:"black",fontSize:24 }} to={`/company/${company?.id}`}>{company?.name}</Link>


            <Space direction="vertical" size="small" style={{fontSize:16,width: "100%",marginTop:"20px"}}>
                <p><AppstoreOutlined/> {company?.category?.name}</p>
                <p><GlobalOutlined/> {company?.nation}</p>
                <p><TeamOutlined/> {company?.size}</p>


                <p><LinkOutlined/>
                    <a style={{color: "black",}} href={company?.website} target="_blank"
                       rel="noopener noreferrer"> {company?.website}</a>
                </p>
                <p style={{ maxWidth: '100%',         // Hoặc 1 giá trị cụ thể: '300px'
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'}}><EnvironmentOutlined/> {company?.address}</p>
            </Space>
        </Card>
    );
};

export default CompanyCard;
