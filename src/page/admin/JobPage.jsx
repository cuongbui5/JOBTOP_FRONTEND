import {Button, Drawer, Dropdown, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {CheckOutlined, CloseOutlined, EyeOutlined, MoreOutlined} from "@ant-design/icons";
import {approveJob, getAllJobs, rejectJob} from "../../api/JobService.js";
import JobDetailSection from "../../components/job/JobDetailSection.jsx";

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

    const handleActionClick = (key, record) => {
        if (key === "approve") handleApprove(record);
        if (key === "reject") handleReject(record);
        if (key === "view") viewJobDetail(record);
    };
    async function handleReject(record) {
        await handleRequest(
            () => rejectJob(record.id),
            (res) => {
                fetchJobs(pagination.current, pagination.pageSize,selectedStatus);
            }
        );
    }

    async function handleApprove(record) {
         await handleRequest(
            () => approveJob(record.id),
            (res) => {
                fetchJobs(pagination.current, pagination.pageSize,selectedStatus);
            }
        );
    }

    function viewJobDetail(record) {
        setJobId(record.id)
        showDrawer();


    }
    const getActionMenu = (record) => ({
        items: [
            { key: "approve", label: "Phê duyệt", icon: <CheckOutlined  style={{color:"green"}} /> },
            { key: "reject", label: "Từ chối", icon: <CloseOutlined style={{color:"red"}} /> },
            { key: "view", label: "Xem chi tiết", icon: <EyeOutlined /> }
        ],
        onClick: ({ key }) => handleActionClick(key, record),
    });

    const columnsResponsive = [
        {title: "ID", dataIndex: "id", key: "id"},
        { title: "Job Title", dataIndex: "title", key: "title", responsive: ["xs", "sm", "md", "lg", "xl"] },
        { title: "Status",dataIndex: "status", key: "status", render: (status) => {
                const color = status === 'Đã duyệt' ? 'green' : status === 'Chờ duyệt' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
        { title: "Company", dataIndex: "companyName", key: "companyName", responsive: ["lg", "xl"] },
        {
            title: "Actions",
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
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>
            <div style={{padding: 20}}>
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
                <Table onChange={handleTableChange} rowKey="id" columns={columnsResponsive} dataSource={jobs}
                       pagination={pagination}/>
            </div>
            <Drawer size={"large"} title="View job" onClose={onClose} open={open}>
               <JobDetailSection view={true} jobId={jobId}/>
            </Drawer>

        </div>
    )
}

export default JobPage;