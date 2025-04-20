import  { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import useApiRequest from "../../hooks/UseHandleApi.js";
import {createPlan, deletePlan, getAllPlans, updatePlan} from "../../api/PlanService.js";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";

const PlanPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const {handleRequest}=useApiRequest();
    const fetchPlans=async ()=>{
        await handleRequest(()=>getAllPlans(),(res)=>{
            console.log(res);
            setPlans(res.data)
        })
    }
    // Fetch plans from the API
    useEffect(() => {

        fetchPlans();

    }, []);

    // Show modal for creating or editing plan
    const showModal = (plan = null) => {
        if (plan) {
            setIsEditing(true);
            setCurrentPlan(plan);
        } else {
            setIsEditing(false);
            setCurrentPlan(null);
        }
        setIsModalVisible(true);
    };

    // Handle form submission for create and update
    const handleOk = async (values) => {
        if(!isEditing){
            await handleRequest(()=>createPlan(values),(res)=>{
                console.log(res)
                setIsModalVisible(false);
                fetchPlans();

            },null,true)
        }else {
            await handleRequest(()=>updatePlan(currentPlan.id,values),(res)=>{
                console.log(res)
                setIsModalVisible(false);
                fetchPlans();
            },null,true)
        }



    };

    // Handle cancel
    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentPlan(null);
        setIsEditing(false);
    };

    // Handle delete plan
    const handleDelete =async (id) => {
       await handleRequest(()=>deletePlan(id),(res)=>{
           console.log(res)
           fetchPlans();
       },null,true)
    };

    // Columns for the table
    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Giá (vnd)', dataIndex: 'price', key: 'price' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Thời hạn (ngày)', dataIndex: 'durationDays', key: 'durationDays' },
        { title: 'Số lượng tin được đăng', dataIndex: 'maxPosts', key: 'maxPosts' },
        {
            title: 'Đang hoạt động',
            dataIndex: 'active',
            key: 'active',
            render: (active) =>
                active ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                )
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => showModal(record)}>Chỉnh sửa</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{margin:"20px 0",textAlign:"center"}}>Quản lý gói dịch vụ</h1>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '16px' }}>
                Tạo gói mới
            </Button>
            <Table
                columns={columns}
                dataSource={plans}
                rowKey="id"
            />

            <Modal
                title={isEditing ? 'Chỉnh sửa gói dịch vụ' : 'Tạo gói dịch vụ mới'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    initialValues={currentPlan || { isActive: true }}
                    onFinish={handleOk}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên gói"
                        rules={[{ required: true, message: 'Vui lòng nhập tên gói!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá (VNĐ)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <Input type="number" min={0} />
                    </Form.Item>

                    <Form.Item
                        name="durationDays"
                        label="Thời hạn (ngày)"
                        rules={[{ required: true, message: 'Vui lòng nhập thời hạn sử dụng!' }]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>

                    <Form.Item
                        name="maxPosts"
                        label="Số bài đăng tối đa"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng bài đăng!' }]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>



                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                            {isEditing ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </div>
                </Form>
            </Modal>

        </div>
    );
};

export default PlanPage;
