import { useEffect, useState } from "react";

import { Select } from "antd";

import {getAllJobsTitle} from "../../api/JobService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getJobStatistics} from "../../api/CompanyDashboardService.js";
import ApplicationStatsChart from "../application/ApplicationStatsChart.jsx";

const { Option } = Select;

const JobStatisticsComponent = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [stats, setStats] = useState(null);


    const {handleRequest}=useApiRequest();


    useEffect(() => {
        const fetchJobTitle=async ()=>{
            await handleRequest(()=>getAllJobsTitle(),(res)=>{
                console.log(res);
                setJobs(res.data)
                setSelectedJobId(res.data[0].id)


            })
        }
        fetchJobTitle();
    }, []);

    useEffect(() => {
        const fetchData=async (jobId)=>{
            await handleRequest(()=>getJobStatistics(jobId),(res)=>{
                console.log(res);
                setStats(res.data)

            })
        }
        if(selectedJobId)
        fetchData(selectedJobId)

    }, [selectedJobId]);

    return (
        <div style={{marginTop:40}}>
            <Select
                style={{ width: 300, marginBottom: 20 }}
                placeholder="Chọn tin tuyển dụng"
                onChange={value => setSelectedJobId(value)}
                value={selectedJobId}
            >
                {jobs.map(job => (
                    <Option key={job.id} value={job.id}>{job.title}</Option>
                ))}
            </Select>


            {stats && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 24 }}>
                    <p style={{ fontSize: 20, marginBottom: 20 }}>Phân tích hiệu quả: <span style={{fontWeight:"500"}}>{stats.title}</span></p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                        <div>
                            <p style={{ margin: 0, color: '#6b7280' }}>Lượt xem</p>
                            <p style={{ fontSize: 18, fontWeight: 700 }}>{stats.viewCount}</p>
                        </div>
                        <div>
                            <p style={{ margin: 0, color: '#6b7280' }}>Lượt ứng tuyển</p>
                            <p style={{ fontSize: 18, fontWeight: 700 }}>{stats.applyCount}</p>
                        </div>
                        <div>
                            <p style={{ margin: 0, color: '#6b7280' }}>Tỉ lệ ứng tuyển</p>
                            <p style={{ fontSize: 18, fontWeight: 700 }}>{stats.conversionRate.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p style={{ margin: 0, color: '#6b7280' }}>Hạn nộp</p>
                            <p style={{ fontSize: 18, fontWeight: 700 }}>{stats.applicationDeadline}</p>
                        </div>
                    </div>

                    <div style={{ margin: "40px 0" }}>
                        <ApplicationStatsChart jobId={selectedJobId}/>



                    </div>
                </div>
            )}
        </div>
    );
};

export default JobStatisticsComponent;
