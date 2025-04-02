import { Menu} from "antd";
import {
    BankOutlined, BellOutlined, CreditCardOutlined,
    DashboardOutlined,
    FileTextOutlined, HeartOutlined, KeyOutlined, LogoutOutlined,
    MessageOutlined, ScheduleOutlined, SolutionOutlined, TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStoredUser} from "../../utils/helper.js";


// eslint-disable-next-line react/prop-types
const AppMenu=({isInline})=>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();




    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");

        window.location.reload();
    };


    useEffect(() => {
        const storedUser=getStoredUser();
        setUser(storedUser);

    }, []);
    const adminMenuItem = [
        {
            key: "/admin/home",
            label: <Link style={{ color: "#A0A0A0", fontSize: "16px" }} to="/admin/home">Dashboard</Link>,
            icon: <DashboardOutlined style={{ color: "#A0A0A0", fontSize: "16px" }} />,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
    ]




    const recruiterMenuItem = [
        {
            key: "/recruiter/dashboard",
            label: <Link to="/recruiter/dashboard"> Dashboard</Link>,
            icon: <DashboardOutlined />,

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
            key: "messages",
            label: "Tin nhắn",
            icon: <MessageOutlined />,

        },
        {
            key: "/recruiter/profile",
            label: <Link to="/recruiter/profile">Hồ sơ công ty</Link>,
            icon: <BankOutlined />,

        },
        {
            key: "/recruiter/interview-schedule",
            label: <Link to="/recruiter/interview-schedule">Đặt lịch phỏng vấn</Link>,
            icon: <ScheduleOutlined />,

        },
        {
            key: "/recruiter/billing",
            label: <Link to="/recruiter/billing">Thanh toán & Gói dịch vụ</Link>,
            icon: <CreditCardOutlined />,

        },
        {
            key: "notifications",
            icon: <BellOutlined />,
            label: <Link to="/notifications">Thông báo</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
    ];




    const userMenuItems = [
        {
            key: "/user-profile",
            icon: <UserOutlined />,
            label: (
                <Link to={"/user-profile"}>
                    Cài đặt hồ sơ cá nhân
                </Link>
            ),
        },
        {
            key: "/resumes",
            icon: <FileTextOutlined />,
            label: <Link to="/resumes">Quản lý cv</Link>,
        },

        {
            key: "/saved-jobs",
            icon: <HeartOutlined />,
            label: <Link to="/saved-jobs">Việc làm đã lưu</Link>,
        },
        {
            key: "/applied-jobs",
            icon: <SolutionOutlined />,
            label: <Link to="/applied-jobs">Việc làm đã ứng tuyển</Link>,
        },
        {
            key: "/interview-schedule/view",
            label: <Link to="/interview-schedule/view">Xem lịch phỏng vấn</Link>,
            icon: <ScheduleOutlined />,

        },
        {
            key: "/followed-companies",
            icon: <BankOutlined />,
            label: <Link to="/followed-companies">Công ty đã theo dõi</Link>,
        },
        {
            key: "change-password",
            icon: <KeyOutlined />,
            label: <Link to="/change-password">Đổi mật khẩu</Link>,
        },
        {
            key: "messages",
            icon: <MessageOutlined />,
            label: <Link to="/messages">Nhắn tin với nhà tuyển dụng</Link>,
        },
        {
            key: "notifications",
            icon: <BellOutlined />,
            label: <Link to="/notifications">Thông báo</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
    ];
    const dropdownItems = user?.roles?.[0]?.name === "USER"
        ? userMenuItems
        : user?.roles?.[0]?.name === "ADMIN"
            ? adminMenuItem
            : recruiterMenuItem;
    const navItems = [
        {
            key: "/companies",
            label: <Link to={"/companies"}>Company</Link>,
        },
        {
            key: "/",
            label: <Link to={"/"}>Công việc</Link>,
        },
        user ? {
                key: "user",
                theme:"dark",
                label: <p>{user.email}</p>,
                children: dropdownItems,

            }
            : {
                key: "3",
                label: <Link to={"/login"} >Đăng nhập/Đăng ký</Link>,
            },
    ];
    return  <Menu mode={isInline?"inline":"horizontal"}
                  theme="dark"
                  selectedKeys={[location.pathname]}
                  items={navItems} style={{
            background:"transparent",
            borderBottom: "none",
            justifyContent: "flex-end",
            width:"100%"
    }}/>

}

export default AppMenu;