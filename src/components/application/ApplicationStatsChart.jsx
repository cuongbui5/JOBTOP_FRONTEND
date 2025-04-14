
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { getStatusStats} from "../../api/PublicService.js";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";


// eslint-disable-next-line react/prop-types
const ApplicationStatsChart = ({ jobId }) => {
    const [stats,setStats]=useState(null);
    const {handleRequest}=useApiRequest();
    const fetchReviewStats=async (jobId)=>{
        await handleRequest(()=>getStatusStats(jobId),(res)=>{
            const total={status:"Tổng đơn ứng tuyển",count:res?.data.total}
            setStats([...res.data.statuses,total]);
            console.log(res.data)
        })
    }
    useEffect(() => {
        fetchReviewStats(jobId)
    }, [jobId]);
    return (
        <div style={{maxWidth:"100%", height: 400,textAlign:"center"}}>
            <h1 style={{marginBottom:20}}>Thống kê số lượng ứng tuyển</h1>
            <ResponsiveContainer>
                <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="status" angle={-8} textAnchor="end"/>
                    <YAxis allowDecimals={false}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="count"  name="Số lượng" fill="#1890ff">
                        <LabelList dataKey="count" position="top"/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicationStatsChart;
