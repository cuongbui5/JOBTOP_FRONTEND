import {Button, Col, Form, Image, notification, Popover, Row, Upload} from "antd";
import CustomInputItem from "../../components/web/CustomInputItem.jsx";
import CustomInputPassword from "../../components/web/CustomInputPassword.jsx";
import {EditOutlined} from "@ant-design/icons";
import CustomButton from "../../components/web/CustomButton.jsx";
import {uploadFile} from "../../api/UploadFileService.js";
import {updateAccount} from "../../api/AccountService.js";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getStoredUser} from "../../utils/helper.js";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";

const AccountForm=()=>{
    const [formBasic] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const {handleRequest} = useApiRequest();

    useEffect(() => {
        const user=getStoredUser();
        console.log(user)
        formBasic.setFieldsValue(user)
        setAvatar(user.avatar || "/images/user_default.png");

    }, []);
    const handlerImageBeforeUpload = async (file) => {
        await handleRequest(() => uploadFile(file), (res) => {
            setAvatar(res.data);
        });
        return false;
    };

    const handleSaveBasic= async (values)=>{
        if(values?.newPassword!==values?.confirmPassword){
            notification.warning({
                message:"Chưa đúng mật khẩu xác nhận"
            })
            return;
        }
        await handleRequest(()=>updateAccount({...values,avatar}),(res)=>{
            console.log(res);
            localStorage.setItem("user",JSON.stringify(res.data))
        },null,true)

    }

    return (
        <ResponsiveContainer>
            <h1 style={{margin: "20px 0"}}>Cập nhật tài khoản</h1>
            <Form layout="vertical" form={formBasic} onFinish={handleSaveBasic}>
                <Row gutter={32}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <CustomInputItem name="fullName" label="Họ và tên"/>
                        <CustomInputPassword name="currentPassword" label="Mật khẩu hiện tại"/>
                        <CustomInputPassword name="newPassword" label="Mật khẩu mới"/>
                        <CustomInputPassword name="confirmPassword" label="Xác nhận mật khẩu mới"/>
                    </Col>


                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item label={<span style={{fontSize: "medium"}}>Avatar</span>}>
                            <Popover
                                content={
                                    <Upload
                                        maxCount={1}
                                        showUploadList={false}
                                        beforeUpload={handlerImageBeforeUpload}
                                    >
                                        <Button icon={<EditOutlined/>}>Chỉnh sửa ảnh</Button>
                                    </Upload>
                                }
                                trigger="hover"
                                placement="right"
                            >
                                <Image
                                    preview={false}
                                    style={{
                                        border: "1px solid #444",
                                        maxWidth: "200px",
                                    }}
                                    src={avatar || "/images/user_default.png"}
                                />
                            </Popover>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <CustomButton content={"Cập nhật"} size={"large"} type={"primary"}/>
                </Form.Item>
            </Form>
        </ResponsiveContainer>
    )
}

export default AccountForm;