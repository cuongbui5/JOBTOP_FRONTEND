import { Menu} from "antd";
import {
    BankOutlined, BellOutlined, CreditCardOutlined,
    DashboardOutlined,
    FileTextOutlined, HeartOutlined, KeyOutlined, LogoutOutlined,
    MessageOutlined, ScheduleOutlined, SolutionOutlined, TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getStoredUser} from "../../utils/helper.js";
import NotificationPopover from "./NotificationPopover.jsx";
import {useMediaQuery} from "react-responsive";



// eslint-disable-next-line react/prop-types
const AppMenu=({isInline})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const user=getStoredUser();
    const isMobile = useMediaQuery({ maxWidth: 767 });


    const handleLogout = () => {
        localStorage.clear()
        navigate("/login");

        window.location.reload();
    };



    const adminMenuItem = [
        {
            key: "/admin/dashboard",
            label: <Link style={{ color: "#A0A0A0", fontSize: "16px" }} to="/admin/dashboard">Dashboard</Link>,
            icon: <DashboardOutlined style={{ color: "#A0A0A0", fontSize: "16px" }} />,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span>Đăng xuất</span>,
        },
    ]

    const recruiterMenuItem = [
        {
            key: "/recruiter/dashboard",
            label: <Link style={{ color: "#A0A0A0", fontSize: "16px" }} to="/recruiter/dashboard">Dashboard</Link>,
            icon: <DashboardOutlined style={{ color: "#A0A0A0", fontSize: "16px" }} />,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span>Đăng xuất</span>,
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
            key: "update-account",
            icon: <KeyOutlined />,
            label: <Link to="/update-account">Cập nhật tài khoản</Link>,
        },
        {
            key: "conversations",
            icon: <MessageOutlined />,
            label: <Link to="/conversations">Nhắn tin với nhà tuyển dụng</Link>,
        },
        {
            key: "notifications",
            icon: <BellOutlined />,
            label: <Link to="/notifications">Thông báo</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span>Đăng xuất</span>,

        },
    ];

    const dropdownItems = user?.role === "CANDIDATE"
        ? userMenuItems
        : user?.role === "ADMIN"
            ? adminMenuItem
            : recruiterMenuItem;
    const navItems = [
        {
            key: "/sematic-search",
            label: <Link to={"/sematic-search"}>Tìm kiếm bằng AI</Link>,
        },
        {
            key: "/companies",
            label: <Link to={"/companies"}>Nhà tuyển dụng</Link>,
        },
        {
            key: "/",
            label: <Link to={"/"}>Công việc</Link>,
        },

    ];



    if (user) {
        navItems.push(
            {

                key: "/notifications",
                label:isMobile?<Link to={"/notifications"}>Thông báo</Link> : <NotificationPopover/> ,
            },
            {
                key: "user",
                label: <p>{user.email}</p>,
                children: dropdownItems,
            }
        );
    } else {
        navItems.push({
            key: "3",
            label: <Link to={"/login"}>Đăng nhập/Đăng ký</Link>,
        });
    }
    return  <Menu mode={isInline?"inline":"horizontal"}
                  theme="dark"
                  selectedKeys={[location.pathname]}
                  onClick={({key})=>{
                      console.log(key)
                      if(key==="logout"){
                          handleLogout();
                      }

                  }}
                  items={navItems} style={{
            background:"transparent",
            borderBottom: "none",
            justifyContent: "flex-end",
            width:"100%"
    }}/>

}

export default AppMenu;