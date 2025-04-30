import { useState } from "react";
import {Avatar, Layout, Menu} from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    FileTextOutlined,
    SettingOutlined, LogoutOutlined, WarningOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider.js";
import {Content, Footer, Header} from "antd/es/layout/layout.js";

import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/web/Logo.jsx";
import {getStoredUser} from "../utils/helper.js";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");

        window.location.reload();
    };

    const items = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => navigate("/admin/dashboard"),
        },
        {
            key: "users",
            icon: <UserOutlined />,
            label: "Quản lý người dùng",
            onClick: () => navigate("/admin/users"),
        },
        {
            key: "jobs",
            icon: <FileTextOutlined />,
            label: "Quản lý tin tuyển dụng",
            onClick: () => navigate("/admin/jobs"),
        },
        {
            key: "packages",
            icon: <SettingOutlined />,
            label: "Quản lý gói",
            onClick: () => navigate("/admin/packages"),
        },
        {
            key: "reports",
            icon: <WarningOutlined />, // Biểu tượng cảnh báo cho báo cáo xấu
            label: "Báo cáo vi phạm",
            onClick: () => navigate("/admin/reports"),
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span>Đăng xuất</span>,
            onClick: () => handleLogout()
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
                <Content style={{ margin: "16px", padding: "16px", background: "#fff", borderRadius: "8px" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>Admin Dashboard ©2025 JOBTOP</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;