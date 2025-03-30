import  { useState, useEffect } from "react";
import { Modal, Button, Typography } from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import {getAllRoles, updateUserRole} from "../../api/AuthService.js";
import {useNavigate} from "react-router-dom";
import useApiRequest from "../../hooks/UseHandleApi.js";

const { Title } = Typography;

const RoleSelectionModal = ({ visible }) => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const {handleRequest}=useApiRequest()

    useEffect(() => {
        const fetchRoles = async () => {
            await handleRequest(() => getAllRoles(), (res) => {
                // Loại bỏ role có name === "ADMIN"
                const filteredRoles = res.data.filter(role => role.name !== "ADMIN" && role.name!=="NONE");
                setRoles(filteredRoles);
            });
        };
        if(visible){
            fetchRoles();
        }

    }, [visible]);

    const handleRoleClick = async (role) => {
        console.log("Selected Role ID:", role.id);
        await handleRequest(()=>updateUserRole(role.id),(res)=>{
            console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data));
            if(role.name==="USER"){
                navigate("/user-profile")
            }else {
                navigate("/recruiter-profile")
            }

        })

    };

    return (
        <Modal open={visible} footer={null} closable={false} centered width={400}>
            <div style={{ textAlign: "center"}}>
                <Title level={3}>Bạn là ...</Title>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
                    {roles.map((role) => (
                        <Button
                            key={role.name}
                            icon={role.name === "USER" ? <UserOutlined /> : <SolutionOutlined />}
                            size="large"
                            onClick={()=>handleRoleClick(role)}

                        >
                            {role.name==="USER"?"Ứng cử viên":"Nhà tuyển dụng"}
                        </Button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default RoleSelectionModal;
