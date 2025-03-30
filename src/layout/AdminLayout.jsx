import { useState } from "react";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    FileTextOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider.js";
import {Content, Footer} from "antd/es/layout/layout.js";

import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

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
            key: "settings",
            icon: <SettingOutlined />,
            label: "Quản lý gói",
            onClick: () => navigate("/admin/settings"),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="demo-logo-vertical" style={{ height: 64, background: "rgba(255, 255, 255, 0.2)", margin: 16 }} />
                <Menu theme="dark" mode="inline" items={items} />
            </Sider>
            <Layout>
                <Content style={{ margin: "16px", padding: "16px", background: "#fff", borderRadius: "8px" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>Admin Dashboard ©2024 Created by You</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;