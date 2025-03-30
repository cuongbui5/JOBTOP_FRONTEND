import {Layout } from "antd";
import HeaderCustom from "../components/web/Header.jsx";
import CustomFooter from "../components/web/Footer.jsx";
import {Outlet} from "react-router-dom";
import ReportJobModal from "../components/job/ReportJobModal.jsx";





const {  Content } = Layout;

const PageLayout=()=> {
    return (
        <Layout>
            <HeaderCustom/>
            <Content style={{width: "100%", minHeight: "90vh", background: "#fff"}}>
                <Outlet/>
            </Content>
            <CustomFooter/>
            <div>
                <ReportJobModal/>

            </div>
        </Layout>


    );
}

export default PageLayout;
