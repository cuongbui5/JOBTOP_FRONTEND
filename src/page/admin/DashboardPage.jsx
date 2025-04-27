import useApiRequest from "../../hooks/UseHandleApi.js";
import {useEffect, useState} from "react";
import {
    getAccountCountByRole, getApplicationsCountByStatus,
    getInterviewCountByStatus,
    getJobCountByStatus, getTopUsedPlan
} from "../../api/AdminDashboardService.js";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import TopViewJobs from "../../components/job/TopViewJobs.jsx";

const DashboardPage=()=>{
    const [accountData,setAccountData]=useState(null);
    const [jobData,setJobData]=useState(null);
    const [interviewData,setInterviewData]=useState(null);
    const [applicationData,setApplicationData]=useState(null);
    const [plansData,setPlansData]=useState(null);
    const {handleRequest}=useApiRequest();
    useEffect(() => {
        const fetchAccountCountByRole=async ()=>{
            await handleRequest(()=>getAccountCountByRole(),(res)=>{
                console.log(res)
                setAccountData(res.data)
            },"load-acc-count")
        }
        const fetchJobCountByStatus=async ()=>{
            await handleRequest(()=>getJobCountByStatus(),(res)=>{
                console.log(res)
                setJobData(res.data)
            },"load-job-count")
        }
        const fetchInterviewCountByStatus=async ()=>{
            await handleRequest(()=>getInterviewCountByStatus(),(res)=>{
                console.log(res)
                setInterviewData(res.data)
            },"load-interview-count")
        }
        const fetchApplicationCountByStatus = async ()=>{
            await handleRequest(()=>getApplicationsCountByStatus(),(res)=>{
                console.log(res)
                setApplicationData(res.data)
            },"load-application-count")
        }
        const fetchUsedPlan = async ()=>{
            await handleRequest(()=>getTopUsedPlan(),(res)=>{
                console.log(res)
                setPlansData(res.data)
            },"load-plans-count")
        }
        fetchAccountCountByRole();
        fetchJobCountByStatus();
        fetchInterviewCountByStatus();
        fetchApplicationCountByStatus();
        fetchUsedPlan();
    }, []);


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2'];
    return (
        <div style={{
            padding: '20px',
            margin: 'auto',
            borderRadius: '8px'
        }}>
            <h1 style={{textAlign: 'center'}}>Dashboard</h1>

            <Button type={"link"} icon={<RightOutlined/>} iconPosition={"end"}>
                <a href="https://dashboard.stripe.com/test/dashboard" target="_blank">Xem doanh thu </a>
            </Button>

            <div style={{display: "flex", gap: 20, flexWrap: "wrap", marginBottom: "100px"}}>

                <LoadingWrapper loadingType={"load-acc-count"}>
                    <div style={{width: '30%', height: 400, marginTop: '40px', textAlign: "center"}}>
                        <h1>Người dùng</h1>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={accountData}
                                    dataKey="count"
                                    nameKey="role"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {accountData?.length > 0 && accountData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </LoadingWrapper>
                <LoadingWrapper loadingType={"load-job-count"}>
                    <div style={{width: '30%', height: 400, marginTop: '40px', textAlign: "center"}}>
                        <h1>Tin tuyển dụng</h1>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={jobData}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {jobData?.length > 0 && jobData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </LoadingWrapper>
                <LoadingWrapper loadingType={"load-interview-count"}>
                    <div style={{width: '30%', height: 400, marginTop: '40px', textAlign: "center"}}>
                        <h1>Lịch phỏng vấn</h1>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={interviewData}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {interviewData?.length > 0 && interviewData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </LoadingWrapper>
                <LoadingWrapper loadingType={"load-application-count"}>
                    <div style={{width: '30%', height: 400, marginTop: '40px', textAlign: "center"}}>
                        <h1>Đơn ứng tuyển</h1>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={applicationData}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {applicationData?.length > 0 && applicationData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </LoadingWrapper>

            </div>

            <div style={{marginBottom: "100px"}}>
                <h1 style={{marginBottom:"20px"}}>Các gói được mua nhiều nhất</h1>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={plansData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="planName"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="usageCount" fill="#8884d8" barSize={50}/>
                    </BarChart>
                </ResponsiveContainer>

            </div>


            <TopViewJobs top={5}/>


        </div>
    )
}

export default DashboardPage;