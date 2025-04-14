import {Form, Input, Button, Select, message, Typography, Card} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllRoles, register} from "../../api/AuthService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import Logo from "../../components/web/Logo.jsx";


const { Option } = Select;



const RegisterPage = () => {

    const navigate=useNavigate();
    const {handleRequest}=useApiRequest()

    const onFinish =async (values) => {
        await handleRequest(()=>register(values),(res)=>{
            console.log(res)
            message.success(res.message);
            navigate("/login")
        })
    };





    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                style={{
                    width: "100%",
                    maxWidth: 450,
                    borderRadius: 0,
                    boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div style={{textAlign: "center"}}>
                    <Logo size={30}/>
                    <p style={{margin: "16px 0", fontSize: "20px", fontWeight: 500}}>Đăng kí tài khoản cho JobTop</p>
                </div>

                <Form name="register" onFinish={onFinish} layout="vertical">
                    {/* Email Field */}
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: "Please enter your email!", type: "email"}]}
                    >
                        <Input  style={{ borderRadius: "0px",padding:0 }} prefix={<MailOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>} placeholder="Email" size="large"/>
                    </Form.Item>

                    <Form.Item
                        name="fullName"
                        rules={[{required: true, message: "Please enter your full name!"}]}
                    >
                        <Input style={{ borderRadius: "0px",padding:0 }} prefix={<UserOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>} placeholder="Họ và tên" size="large"/>
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        style={{
                            borderRadius: 0
                        }}
                        name="password"
                        rules={[{required: true, message: "Please enter your password!"}]}
                    >
                        <Input.Password  style={{ borderRadius: "0px",padding:0,paddingRight:"15px" }} prefix={<LockOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>}  placeholder="Mật khẩu" size="large"/>
                    </Form.Item>

                    {/* Confirm Password */}
                    <Form.Item
                        name="passwordConfirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {required: true, message: "Please confirm your password!"},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("The passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password  style={{ borderRadius: "0px",padding:0 ,paddingRight:"15px"}} prefix={<LockOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>} placeholder="Xác nhận mật khẩu" size="large"/>
                    </Form.Item>

                    {/* Role Selection */}
                    <Form.Item name="role" rules={[{required: true, message: "Please select your role!"}]}>
                        <Select style={{borderRadius:0}}  placeholder="Bạn là ..." size="large">
                            <Option  key={"CANDIDATE"} value={"CANDIDATE"}>
                                Ứng cử viên
                            </Option>
                            <Option  key={"EMPLOYER"} value={"EMPLOYER"}>
                                Nhà tuyển dụng
                            </Option>

                        </Select>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button style={{ borderRadius: "0px" }} type="primary" htmlType="submit" size="large" block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                {/* Link to Login */}
                <div style={{textAlign: "center", marginTop: "16px"}}>
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <Link to="/login">
                            <span style={{color: "#1890ff"}}>Đăng nhập ngay</span>
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
