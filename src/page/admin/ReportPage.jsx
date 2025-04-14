import {Table, Tag} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllReports} from "../../api/ReportService.js";
import {Link} from "react-router-dom";


const ReportPage=()=>{
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [reports, setReports] = useState([]);
    const {handleRequest}=useApiRequest();

    const fetchReports=async (page,size)=>{
        await handleRequest(()=>getAllReports(page,size),(res)=>{
            console.log(res);
            setReports(res.data.content)
            setPagination({
                current: res.data.currentPage,
                pageSize: size,
                total: res.data.totalElements,
            });
        })

    }
    useEffect(() => {
        fetchReports(pagination.current,pagination.pageSize)
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Người gửi",
            dataIndex: "email", // giả sử bạn có fullName trong user
            key: "email",
            render: (_,record) => <Link  to={`/profile/user/${record.userId}`}>{record.email}</Link>,

        },
        {
            title: "Tên công việc",
            dataIndex: "jobTitle", // giả sử bạn có title trong job
            key: "jobTitle",
            render: (_,record) => <Link  to={`/job-detail/${record.jobId}`}>{record.jobTitle}</Link>,
        },
        {
            title: "Lí do",
            dataIndex: "reason",
            key: "reason",
            render: (reason) => <Tag color="red">{reason}</Tag>,
        },
        {
            title: "Thông tin thêm",
            dataIndex: "additionalInfo",
            key: "additionalInfo",
        },
    ];
    const handleTableChange =async (pagination) => {
        await fetchReports(pagination.current, pagination.pageSize);
    };
    return (
        <div style={{padding: 24}}>
            <h1 style={{margin:"20px 0"}}>Báo cáo công việc</h1>
            <Table
                rowKey="id"
                dataSource={reports}
                columns={columns}
                onChange={handleTableChange}
                bordered
            />
        </div>
    )
}

export default ReportPage;