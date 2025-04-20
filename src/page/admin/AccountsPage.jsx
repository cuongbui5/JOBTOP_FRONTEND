import { useEffect, useState } from "react";
import {Table, Select, Avatar, Tag, Button, Input} from "antd";
import {getAllAccounts, updateAccountStatus} from "../../api/AccountService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getRoleTypeLabel} from "../../utils/helper.js";


const { Option } = Select;

const AccountsPage = () => {
    const { handleRequest } = useApiRequest();
    const [pagination, setPagination] = useState({ current: 1, pageSize: 4, total: 0 });
    const [accounts, setAccounts] = useState([]);
    const [roleFilter, setRoleFilter] = useState(null); // roleType filter
    const [companyName, setCompanyName] = useState("");

    const fetchAccounts = async (page, size, roleType,companyName) => {
        await handleRequest(
            () => getAllAccounts(page , size, roleType,companyName),
            (res) => {
                console.log(res)
                setAccounts(res.data.content);
                setPagination({
                    current: res.data.currentPage,
                    pageSize: size,
                    total: res.data.totalElements,
                });
            }
        );
    };

    useEffect(() => {
        fetchAccounts(pagination.current, pagination.pageSize, roleFilter,companyName);
    }, [roleFilter,pagination.current,companyName]);

    const handleTableChange = (pagination) => {
        setPagination((prev) => ({
            ...prev,
            current: pagination.current,
            pageSize: pagination.pageSize,
        }));
    };

    const handleRoleChange = (value) => {
        setRoleFilter(value || null);
        setPagination((prev) => ({ ...prev, current: 1 }));
    };

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar",
            key: "avatar",
            render: (url) => <Avatar src={url||"/images/user_default.png"} />,
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role) => {
                 const {text,color}=getRoleTypeLabel(role);
                return <Tag color={color}>{text}</Tag>
            }
        },
        {
            title: "Tên công ty",
            dataIndex: "companyName",
            key: "companyName",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === "ACTIVE" ? (
                    <Tag color="green">Hoạt động</Tag>
                ) : (
                    <Tag color="red">Bị khóa</Tag>
                ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                    <Button onClick={async ()=>{
                        const newStatus=record.status==="ACTIVE"?"BANNED":"ACTIVE"
                        await handleRequest(()=>updateAccountStatus(record.id,newStatus),(res)=>{
                            console.log(res);
                            record.status=newStatus;
                        })
                    }}>
                        {record.status==="ACTIVE"?"Khóa tài khoản":"Mở khóa"}
                    </Button>

            ),
            responsive: ["xs", "sm", "md", "lg", "xl"]
        },
    ];

    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff", padding: 20}}>
            <h1 style={{textAlign: "center"}}>Danh sách tài khoản</h1>
            <div style={{marginBottom: 16, display: "flex", gap: "1rem", flexWrap: "wrap"}}>
                <Select
                    style={{width: 200}}
                    allowClear
                    placeholder="Chọn vai trò"
                    onChange={handleRoleChange}
                >
                    <Option value="EMPLOYER">Nhà tuyển dụng</Option>
                    <Option value="CANDIDATE">Ứng cử viên</Option>
                </Select>

                <Input
                    style={{width: 250}}
                    placeholder="Tìm theo tên công ty"
                    allowClear
                    value={companyName}
                    onChange={(e) => {
                        setCompanyName(e.target.value);
                        setPagination((prev) => ({...prev, current: 1}));
                    }}
                />
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={accounts}
                rowKey={(record) => record.id}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default AccountsPage;
