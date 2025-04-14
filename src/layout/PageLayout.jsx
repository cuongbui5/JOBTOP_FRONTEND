import {Layout } from "antd";
import HeaderCustom from "../components/web/Header.jsx";
import CustomFooter from "../components/web/Footer.jsx";
import {Outlet} from "react-router-dom";
import ReportModal from "../components/job/ReportModal.jsx";
import useWebSocketStore from "../store/WebSocketStore.js";
import {getStoredUser} from "../utils/helper.js";
import {useEffect} from "react";





const {  Content } = Layout;

const PageLayout=()=> {
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

    return (
        <Layout>
            <HeaderCustom/>
            <Content style={{width: "100%", minHeight: "90vh", background: "#fff"}}>
                <Outlet/>
            </Content>
            <CustomFooter/>
            <div>
                <ReportModal/>

            </div>
        </Layout>


    );
}

export default PageLayout;
