import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { getUserProfileByUserId} from "../../api/PublicService.js";
import {Avatar, Button, Card, Space, Typography} from "antd";
import {BookOutlined, HomeOutlined, MessageOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";


const { Title, Text, Paragraph } = Typography;
const UserProfileViewPage=()=>{
    const { id } = useParams();
    const {handleRequest}=useApiRequest();
    const [profile,setProfile]=useState(null);
    useEffect(() => {
        const fetchUserProfile= async (userId)=>{
            await handleRequest(()=>getUserProfileByUserId(userId),(res)=>{
                console.log(res)
                setProfile(res.data)
            })
        }

        fetchUserProfile(id);

    }, [id]);

    return (
        <Card
            style={{
                maxWidth: 600,
                margin: "auto",

            }}

        >
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
            }}>
                <Avatar
                    size={100}
                    src={"/images/user_default.png"}
                    style={{ marginBottom: 10 }}
                />
                <Button
                    type="primary"
                    icon={<MessageOutlined />}

                >
                    Nhắn tin
                </Button>

            </div>

            <Title level={3}>{profile?.fullName}</Title>
            {profile?.publicProfile ?(
                <Space direction="vertical">
                    <Text strong>
                        <strong>Số điện thoại:</strong> {profile?.phone || "N/A"}
                    </Text>
                    <Text>
                        <strong>Địa chỉ:</strong> {profile?.address || "Chưa cập nhật"}
                    </Text>
                    <Text>
                        <strong>Học vấn:</strong> {profile?.education || "Chưa cập nhật"}
                    </Text>
                    <Text>
                        <strong>Ngày sinh:</strong> {profile?.dateOfBirth ? dayjs(profile.dateOfBirth).format("DD-MM-YYYY") : "Chưa cập nhật"}
                    </Text>
                    <Text>
                        <strong>Giới tính:</strong> {profile?.gender === "MALE" ? "Nam" : profile?.gender === "FEMALE" ? "Nữ" : "Khác"}
                    </Text>
                    <Text>
                        <strong>Mô tả:</strong> {profile?.description || "Chưa cập nhật"}
                    </Text>
                    <Text>
                        <strong>Kỹ năng:</strong> {profile?.skills || "Chưa cập nhật"}
                    </Text>
                </Space>
            ):(
                <div>
                    Người này không muốn public thông tin
                </div>
            )
            }


        </Card>
    )
}

export default UserProfileViewPage;