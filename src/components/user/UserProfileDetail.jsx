import dayjs from "dayjs";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getUserProfileById} from "../../api/PublicService.js";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const UserProfileDetail=({id})=>{
    const [candidate,setCandidate]=useState(null);
    const {handleRequest}=useApiRequest();
    useEffect(()=>{
        const fetchUserProfile=async (id)=>{
            await handleRequest(()=>getUserProfileById(id),(res)=>{
                console.log(res);
                setCandidate(res.data);
            },null,false)
        }
        if(id)
        fetchUserProfile(id);
    },[id])

    return (
        <div>

            <div style={{textAlign: "center", marginBottom: 20}}>
                <Avatar
                    size={100}
                    src={candidate?.image}
                    icon={!candidate?.image && <UserOutlined/>}
                />
                <h2 style={{marginTop: 10}}>{candidate?.fullName}</h2>
            </div>
            <div style={{padding: "10px 20px", fontSize: "16px"}}>
                <p><strong>Giới tính:</strong> {candidate?.gender}</p>
                <p><strong>Ngày sinh:</strong> {dayjs(candidate?.dateOfBirth).format("DD/MM/YYYY")}</p>
                <p><strong>Số điện thoại:</strong> {candidate?.phone}</p>
                <p><strong>Địa chỉ:</strong> {candidate?.address}</p>
                <p><strong>Kĩ năng:</strong> {candidate?.skills}</p>
                <p><strong>Học vấn:</strong> {candidate?.education}</p>
                <p><strong>Mô tả bản thân:</strong> {candidate?.description}</p>
                <p><strong>CV:</strong> {candidate?.resume ?
                    <a href={candidate?.resume} target="_blank" rel="noopener noreferrer">Xem
                        CV</a> : "Not available"}</p>
            </div>
        </div>

    )
}

export default UserProfileDetail;