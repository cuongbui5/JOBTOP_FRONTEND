import {Avatar, Card, Descriptions} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {getStoredUser} from "../../utils/helper.js";
import dayjs from "dayjs";


// eslint-disable-next-line react/prop-types
const UserProfileCard = ({user}) =>{
    console.log(user)
    return ( <Card
        style={{
            width: "100%",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}
    >
        <div style={{ textAlign: "center"}}>
            <Avatar size={100} src={user?.image} icon={!user?.image && <UserOutlined />} />
            <h2 style={{ marginTop: 10 }}>{user?.fullName}</h2>
        </div>

        <Descriptions bordered column={1} styles={{ label: { width: "20%" } }}>
            <Descriptions.Item label="Email">{getStoredUser()?.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{user?.phone}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{user?.address}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh"> {user?.dateOfBirth ? dayjs(user?.dateOfBirth).format("DD/MM/YYYY") : "Chưa cập nhật"}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{user?.gender === "MALE" ? "Nam" : user?.gender === "FEMALE" ? "Nữ" : "Khác"}</Descriptions.Item>
            <Descriptions.Item label="Học vấn">{user?.education}</Descriptions.Item>
            <Descriptions.Item styles={{ content: { whiteSpace: "pre-line" } }} label="Kỹ năng">{user?.skills}</Descriptions.Item>
            <Descriptions.Item styles={{ content: { whiteSpace: "pre-line" } }} label="Mô tả bản thân">{user?.description}</Descriptions.Item>
            <Descriptions.Item label="Link CV">
                <a href={user?.resume} target="_blank" rel="noopener">{user?.resume}</a>
            </Descriptions.Item>
        </Descriptions>


    </Card>)
}

export default UserProfileCard;