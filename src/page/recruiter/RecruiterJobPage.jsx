import {Button, Flex, Modal, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {deleteJob, getAllJobByUser} from "../../api/JobService.js";
import {useNavigate} from "react-router-dom";
import useHandleApi from "../../hooks/UseHandleApi.js";

/*const columns = [
    {
        title: 'Job Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Job Type',
        dataIndex: 'jobType',
        key: 'jobType',
    },
    {
        title: 'Experience Level',
        dataIndex: 'experienceLevel',
        key: 'experienceLevel',
    },
    {
        title: 'Salary Range',
        dataIndex: 'salary',
        key: 'salary',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            const color = status === 'OPEN' ? 'green' : status === 'PENDING' ? 'orange' : 'red';
            return <Tag color={color}>{status}</Tag>;
        },
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record.key)}>Edit</Button>
                <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)}>Delete</Button>
            </Space>
        ),
    },
];*/



const RecruiterJobPage=()=>{
    const [jobs,setJobs]=useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const navigate=useNavigate()
    const {handleRequest}=useHandleApi()



    const columnsResponsive = [
        {title: "ID", dataIndex: "id", key: "id"},
        { title: "Job Title", dataIndex: "title", key: "title", responsive: ["xs", "sm", "md", "lg", "xl"] },
        { title: "Location", dataIndex: "location", key: "location", responsive: ["sm", "md", "lg", "xl"] },
        { title: "Job Type", dataIndex: "jobType", key: "jobType", responsive: ["md", "lg", "xl"] },
        { title: "Experience Level", dataIndex: "experienceLevel", key: "experienceLevel", responsive: ["lg", "xl"] },
        { title: "Salary Range",render:(_,record)=>{
                return <span>{record.salaryMin} - {record.salaryMax} đ/tháng</span>

            }, dataIndex: "salary", key: "salary", responsive: ["lg", "xl"] },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const color = status === 'APPROVED' ? 'green' : status === 'PENDING' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
        { title: "Deadline", dataIndex: "applicationDeadline", key: "applicationDeadline", responsive: ["lg", "xl"] },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Flex gap="small" wrap="wrap">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)}>Delete</Button>
                </Flex>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
    ];

    const handleEdit = (data) => {
        navigate(`/job/edit/${data.id}`)
    };

    const handleDelete =async (data) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa công việc này?",
            content: "Hành động này không thể hoàn tác.",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                await handleRequest(()=>deleteJob(data.id),(res)=>{
                    if(res.status===200){
                        setJobs((prevJobs) => prevJobs.filter((j) => j.id !== data.id));
                    }

                })
            },
        });

    };

    const fetchJobs = async (page,size) => {
        await handleRequest(
            () => getAllJobByUser(page,size),
            (res) => {
                console.log(res);
                setJobs(res.data.content);
                setPagination({
                    current: res.data.number,
                    pageSize: res.data.size,
                    total: res.data.totalElements, // Tổng số bản ghi từ API
                });
            }
        );
    };

    useEffect(() => {
        fetchJobs(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange =async (pagination) => {
        await fetchJobs(pagination.current, pagination.pageSize);
    };



    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>
            <div style={{padding: 20}}>
                <Button type="primary"  style={{marginBottom: 16}} onClick={()=>{
                    navigate("/job/create")
                }}>Thêm tin tuyển dụng</Button>
                <Table onChange={handleTableChange}  rowKey="id" columns={columnsResponsive} dataSource={jobs} pagination={pagination}   />
            </div>

        </div>
    )
}

export default RecruiterJobPage;