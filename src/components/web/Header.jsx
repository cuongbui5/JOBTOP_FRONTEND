import {Drawer, Layout} from "antd";
import AppMenu from "./AppMenu.jsx";
import { useState} from "react";
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";
import {useMediaQuery} from "react-responsive";
import Logo from "./Logo.jsx";
const { Header } = Layout;
const MyHeader = () => {
    const [openMenu,setOpenMenu]=useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });


    // Menu items
    return (
        <Header
            style={{
                width: "100%",
                padding: "0px 25px",
                margin: 0,
                display:"flex",
                justifyContent:"space-between"

            }}
        >
            <Logo size={24}/>







            {!isMobile && <AppMenu />}

            {isMobile && (

                    <MenuOutlined
                        onClick={() => setOpenMenu(true)}
                        style={{
                        fontSize: "24px",
                        color: "white",
                        cursor: "pointer",
                    }} />

            )}
            <Drawer open={openMenu}
                    styles={{
                        header:{background:"#001529"},
                        body:{background:"#001529"}
                    }}
                    onClose={()=>setOpenMenu(false)}
                    closeIcon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}
            >
                <AppMenu isInline={true}/>
            </Drawer>





        </Header>


    );
};

export default MyHeader;

/**/