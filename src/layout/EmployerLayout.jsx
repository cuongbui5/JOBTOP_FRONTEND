import {useEffect, useState} from "react";
import {Avatar, Layout, Menu} from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    FileTextOutlined,
    LogoutOutlined,
    TeamOutlined,
    BankOutlined,
    ScheduleOutlined,
    CreditCardOutlined,
    MessageOutlined, BellOutlined, SearchOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider.js";
import {Content, Footer, Header} from "antd/es/layout/layout.js";

import {Link, Outlet, useNavigate} from "react-router-dom";
import {getStoredUser} from "../utils/helper.js";
import useWebSocketStore from "../store/WebSocketStore.js";
import Logo from "../components/web/Logo.jsx";

const EmployerLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const { connect, disconnect, socket, isConnected } = useWebSocketStore((state) => state);
    const user = getStoredUser();

    useEffect(() => {

        if (user && !isConnected) {
            connect(user.id);
        }

        return () => {
            if (socket && socket.connected) {
                disconnect();
            }
        };
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");

        window.location.reload();
    };

    const items = [
        {
            key: "/recruiter/dashboard",
            label: <Link to="/recruiter/dashboard"> Dashboard</Link>,
            icon: <DashboardOutlined />,

        },
        {
            key: "/recruiter/profile",
            label: <Link to="/recruiter/profile">Hồ sơ công ty</Link>,
            icon: <BankOutlined />,

        },
        {
            key: "/recruiter/jobs",
            label: <Link to="/recruiter/jobs"> Quản lý tin tuyển dụng</Link>,
            icon: <FileTextOutlined />,

        },
        {
            key: "/recruiter/applications",
            label: <Link to="/recruiter/applications"> Quản lý đơn ứng tuyển</Link>,
            icon:<TeamOutlined />,

        },

        {
            key: "/recruiter/interview-schedule",
            label: <Link to="/recruiter/interview-schedule">Đặt lịch phỏng vấn</Link>,
            icon: <ScheduleOutlined />,

        },
        {
            key: "/recruiter/search-candidate",
            label: <Link to="/recruiter/search-candidate">Tìm kiếm ứng viên</Link>,
            icon:  <SearchOutlined /> ,

        },
        {
            key: "/recruiter/plans",
            label: <Link to="/recruiter/plans">Quản lý gói dịch vụ</Link>,
            icon: <CreditCardOutlined />,

        },

        {
            key: "/recruiter/conversations",
            icon: <MessageOutlined />,
            label: <Link to="/recruiter/conversations">Xem tin nhắn</Link>,
        },
        {
            key: "/recruiter/notifications",
            icon: <BellOutlined />,
            label: <Link to="/recruiter/notifications">Thông báo</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span>Đăng xuất</span>,
            onClick:()=>handleLogout()
        },
    ];




    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="demo-logo-vertical" style={{ height: 64, background: "rgba(255, 255, 255, 0.2)", margin: 16 }} />
                <Menu theme="dark" mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: "0 2px 8px #f0f1f2",
                    }}
                >
                    <Logo size={"20px"}/>
                    <div style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                        <Avatar icon={<UserOutlined/>} style={{marginRight: 8}}/>
                        <span>{getStoredUser().email}</span>
                    </div>


                </Header>
                <Content style={{margin: "16px", background: "#fff", borderRadius: "8px"}}>
                    <Outlet/>
                </Content>
                <Footer style={{textAlign: "center"}}>Employer Dashboard ©2025 JOBTOP</Footer>
            </Layout>
        </Layout>
    );
};

export default EmployerLayout;