import {Button, Card, Space} from "antd";
import {AppstoreOutlined, EnvironmentOutlined, GlobalOutlined, LinkOutlined, TeamOutlined} from "@ant-design/icons";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {followRecruiter, getFollowByUserAndRecruiter, unFollowRecruiter} from "../../api/FollowService.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CompanyCard = ({ company,noEffect }) => {
    const {handleRequest}=useApiRequest();
    const [follow,setFollow]=useState(null)

    useEffect(()=>{
        if (noEffect) return;
        const fetchFollow= async (id)=>{
            await handleRequest(()=>getFollowByUserAndRecruiter(id),(res)=>{
                console.log(res);
                setFollow(res.data)
            },null,false)
        }
        if(company){
            fetchFollow(company?.id)
        }

    },[company])


    const followCompany=async (id)=>{
        await handleRequest(()=>followRecruiter(id),(res)=>{
            setFollow(res.data)
        },null,true)
    }

    const unFollowCompany=async (id)=>{
        await handleRequest(()=>unFollowRecruiter(id),(res)=>{
            setFollow(null)
        },null,true)
    }



    return (
        <Card

            style={{position:"relative", width: "100%", borderRadius: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            actions={
              [
                  noEffect ? (
                      <Link to={`/recruiter-detail/${company?.id}`}>
                          <Button key="view"  type="default">
                              Xem công ty
                          </Button>

                      </Link>
                  ) : (
                      follow ? (
                          <Button key="unfollow" onClick={() => unFollowCompany(follow?.id)} type="default">
                              Bỏ theo dõi
                          </Button>
                      ) : (
                          <Button key="follow" onClick={() => followCompany(company?.id)} type="default">
                              + Theo dõi công ty
                          </Button>
                      )
                  )

              ]
            }
            cover={
                <div style={{
                    height: 240,
                    background: "#f5f5f5",


                }}>
                    <img src={"/images/bg-company.jpg"} alt="Logo" style={{  width: "100%",
                        height: "100%",
                        objectFit: "cover"}}
                    />
                </div>
            }
        >
            <img style={{
                position:"absolute",
                top:200,
                right:30,
                borderRadius:"8px"
            }} width={75} height={75} src={company?.companyLogo||"/images/company-logo-default.jpg"} />
            <h3  style={{marginBottom: 10 }}>{company?.companyName}</h3>
            <Space direction="vertical" size="small" style={{width: "100%"}}>
                <p style={{
                    fontSize: "16px",
                    fontWeight: "450",
                    color: "#555"
                }}>
                    <TeamOutlined/> {company?.companySize}
                </p>
                <p style={{
                    fontSize: "16px",
                    fontWeight: "450",
                    color: "#555"
                }}><LinkOutlined/> <a href={company?.companyWebsite} target="_blank"
                                      rel="noopener noreferrer">{company?.companyWebsite}</a></p>
                <p style={{
                    fontSize: "16px",
                    fontWeight: "450",
                    color: "#555"
                }}><EnvironmentOutlined/> {company?.companyAddress}</p>
                <p style={{
                    fontSize: "16px",
                    fontWeight: "450",
                    color: "#555"
                }}><GlobalOutlined/> {company?.nation}</p>
                <p style={{
                    fontSize: "16px",
                    fontWeight: "450",
                    color: "#555"
                }}><AppstoreOutlined/> {company?.category?.name}</p>
            </Space>
        </Card>
    );
};

export default CompanyCard;
