import {Form, Input, Button, Checkbox, Divider, Card} from "antd";
import { UserOutlined, LockOutlined, GithubOutlined } from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../api/AuthService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import Logo from "../../components/web/Logo.jsx";




const GITHUB_CLIENT_ID = "Ov23liUpNMT1PHMNW8Gr";
const GITHUB_SCOPE = "read:user,user:email";
const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { handleRequest } = useApiRequest();



    const onFinish =async (values) => {
         await handleRequest(()=> login(values),(res)=>{
             localStorage.clear();
             localStorage.setItem("token",res.data.token);
             localStorage.setItem("user",JSON.stringify(res.data.user));

             navigate(res.data.user.roles[0].name === "ADMIN" ? "/admin/home" : "/");

        })

    };


    const handleGithubLogin = () => {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${encodeURIComponent(GITHUB_SCOPE)}`);
    };

    return (

        <div style={{
            width:"100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",

        }}>

            <Card style={{
                width: "100%",
                maxWidth:450,
                borderRadius:0,
                boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",


            }}
            >

                <div style={{textAlign: "center"}}>
                    <Logo size={30}/>
                    <p style={{margin:"16px 0",fontSize:"20px",fontWeight:500}}>Đăng nhập vào JobTop</p>
                </div>
                <Form form={form} name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: "Please enter your email!"}]}
                    >
                        <Input style={{ borderRadius: "0px",padding:0 }} prefix={<UserOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>} placeholder="Email" size="large"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "Please enter your password!"}]}
                    >
                        <Input.Password style={{ borderRadius: "0px",padding:"0",paddingRight:"15px" }} prefix={<LockOutlined style={{ color: "#555",background:"#ddd",fontSize:"18px",padding:"10px" }}/>} placeholder="Mật khẩu" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Ghi nhớ</Checkbox>
                        <Link to={"/"} style={{float: "right"}}>Quên mật khẩu?</Link>
                    </Form.Item>
                    <Button style={{
                        borderRadius:0
                    }} size="large" type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                    <Divider style={{ borderColor: "#ddd",color:"#555" }}>Đăng nhập bằng</Divider>
                    <Button
                        size="large"
                        type="default"
                        icon={<GithubOutlined/>}
                        block
                        onClick={handleGithubLogin}
                        style={{
                            background:"black",
                            color:"white",
                            borderRadius:0
                        }}
                    >
                        Đăng nhập bằng Github
                    </Button>
                    <Link to={"/register"}>
                        <Button type="default" size="large" block style={{marginTop:"10px",borderRadius:0}}>Đăng ký</Button>
                    </Link>
                </Form>
            </Card>
        </div>


    );
};

export default LoginPage;