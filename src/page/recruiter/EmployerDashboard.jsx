import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import CompanyStatistics from "../../components/company/CompanyStatistics.jsx";
import EmployerDashboardStats from "../../components/analytics/EmployerDashboardStats.jsx";
import JobStatisticsComponent from "../../components/analytics/JobStatisticsComponent.jsx";

const EmployerDashboard=()=>{
    return (
        <ResponsiveContainer>
            <h1 style={{margin:"20px 0"}}>Thống kê</h1>
            <EmployerDashboardStats/>
            <JobStatisticsComponent/>


        </ResponsiveContainer>
    )
}

export default EmployerDashboard;