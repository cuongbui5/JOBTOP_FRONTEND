import {Button, Space, Table, Tag, Typography} from 'antd';
import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {activePlan, cancelPlan, getAllAccountPlans} from "../../api/AccountPlanService.js";

const { Title } = Typography;

const PlanManagementPage = () => {
    const { handleRequest } = useHandleApi();
    const [plans, setPlans] = useState([]);
    const [hasCurrentPlan ,setHasCurrentPlan ]=useState(false);

    useEffect(() => {
        const fetchAccountPlans = async () => {
            await handleRequest(() => getAllAccountPlans(), (res) => {
                setPlans(res.data);
                setHasCurrentPlan( res.data.some(plan => plan.current))
            });
        };
        fetchAccountPlans();
    }, []);

    async function handleActivate(plan) {
        await handleRequest(()=>activePlan(plan.id),(res)=>{
            console.log(res);
            plan.current=true
            setHasCurrentPlan(true)

        })
    }

    async function handleDeactivate(plan) {
        await handleRequest(()=>cancelPlan(plan.id),(res)=>{
            console.log(res);
            plan.current=false
            setHasCurrentPlan(false)

        })

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên gói',
            dataIndex: ['plan', 'name'],
            key: 'planName',
        },
        {
            title: 'Mô tả',
            dataIndex: ['plan', 'description'],
            key: 'description',
        },
        {
            title: 'Giá (VND)',
            dataIndex: ['plan', 'price'],
            key: 'price',
            render: (price) => price.toLocaleString('vi-VN'),
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Số bài đăng còn lại',
            dataIndex: 'remainingPosts',
            key: 'remainingPosts',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'current',
            key: 'current',
            render: (current) => (
                <Tag color={current ? 'green' : 'default'}>
                    {current ? 'Đang dùng' : 'Không sử dụng'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => {
                if (record.current) {
                    // Gói hiện tại -> hiển thị nút "Ngừng sử dụng"
                    return (
                        <Button
                            danger
                            onClick={() => handleDeactivate(record)}

                        >
                            Ngừng sử dụng
                        </Button>
                    );
                }

                if (hasCurrentPlan) {
                    // Đã có gói current rồi, các gói khác không hiển thị nút gì
                    return null;
                }
                return (
                    <Button
                        type="primary"
                        onClick={() => handleActivate(record)}
                    >
                        Đặt làm gói hiện tại
                    </Button>
                );

            }

        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
                Quản lý gói tài khoản
            </Title>
            <Table
                dataSource={plans}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default PlanManagementPage;
