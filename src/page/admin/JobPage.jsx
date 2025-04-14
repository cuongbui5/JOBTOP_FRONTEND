import {Button, Drawer, Dropdown, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {CheckOutlined, CloseOutlined, EyeOutlined, MoreOutlined} from "@ant-design/icons";
import {getAllJobs, updateJobStatus} from "../../api/JobService.js";
import JobDetailSection from "../../components/job/JobDetailSection.jsx";
import {getJobStatusLabel} from "../../utils/helper.js";

const JobPage=()=>{
    const [jobs,setJobs]=useState(null);
    const [jobId,setJobId]=useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const [selectedStatus, setSelectedStatus] = useState("");
    const {handleRequest}=useHandleApi();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);

    };

    const onClose = () => {
        setOpen(false);
    };

    const handleActionClick =async (key, record) => {
        if (key === "VIEW"){
            viewJobDetail(record);
        } else{
            await updateJobStatusById(record,key)

        }
    };
    async function updateJobStatusById(job,status) {
        await handleRequest(()=>updateJobStatus(job.id,{status}),(res)=>{
            console.log(res)
            job.status=status
        })

    }



    function viewJobDetail(record) {
        setJobId(record.id)
        showDrawer();


    }
    const getActionMenu = (record) => ({
        items: [
            { key: "APPROVED", label: "Phê duyệt", icon: <CheckOutlined  style={{color:"green"}} /> },
            { key: "REJECTED", label: "Từ chối", icon: <CloseOutlined style={{color:"red"}} /> },
            { key: "VIEW", label: "Xem chi tiết", icon: <EyeOutlined /> }
        ],
        onClick: ({ key }) => handleActionClick(key, record),
    });

    const columnsResponsive = [
        {title: "Id", dataIndex: "id", key: "id"},
        { title: "Tên công việc", dataIndex: "title", key: "title", responsive: ["xs", "sm", "md", "lg", "xl"] },
        { title: "Trạng thái",dataIndex: "status", key: "status", render: (status) => {
                const {text,color}=getJobStatusLabel(status)
                return <Tag color={color}>{text}</Tag>;
            },
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
        { title: "Công ty", dataIndex: "company", key: "company",
            render: (company) => {

                return <p>{company.name}</p>;
            },responsive: ["lg", "xl"] },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Dropdown menu={getActionMenu(record)} trigger={['click']}>
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
    ];



    const fetchJobs = async (page,size,status) => {
        await handleRequest(
            () => getAllJobs(page,size,status),
            (res) => {
                console.log(res);
                setJobs(res.data.content);
                setPagination({
                    current: res.data.currentPage,
                    pageSize: size,
                    total: res.data.totalElements,
                });
            }
        );
    };

    useEffect(() => {
        fetchJobs(pagination.current, pagination.pageSize,selectedStatus);
    }, [selectedStatus]);

    const handleTableChange =async (pagination) => {
        await fetchJobs(pagination.current, pagination.pageSize,selectedStatus);
    };
    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff",padding:20}}>
            <h1 style={{margin:"20px 0"}}>Quản lý tin tuyển dụng</h1>
            <div >
                <Select
                    style={{ width: 200, marginBottom: 16 }}
                    placeholder="Lọc theo trạng thái"
                    onChange={(value) => setSelectedStatus(value)}
                    allowClear
                >
                    <Select.Option value="pending">Chờ duyệt</Select.Option>
                    <Select.Option value="approved">Đã duyệt</Select.Option>
                    <Select.Option value="rejected">Bị từ chối</Select.Option>
                </Select>
                <Table
                    scroll={{ x: "max-content" }}
                    onChange={handleTableChange} rowKey="id" columns={columnsResponsive} dataSource={jobs}
                       pagination={pagination}/>
            </div>
            <Drawer size={"large"} title="Xem chi tiết công việc" onClose={onClose} open={open}>
               <JobDetailSection view={true} jobId={jobId}/>
            </Drawer>

        </div>
    )
}

export default JobPage;