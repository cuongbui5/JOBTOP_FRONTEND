import {Button, DatePicker, Form, Input, Select, TimePicker, Table, Checkbox} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobTitle} from "../../api/JobService.js";
import {getApplicationsByFilter} from "../../api/ApplicationService.js";
import dayjs from "dayjs";

const CreateInterviewSchedulePage = () => {
    const [form] = Form.useForm();
    const [applicants, setApplicants] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const {handleRequest} = useApiRequest();
    const [jobSelected, setJobSelected] = useState(null);
    const [jobTitles, setJobTitles] = useState(null);

    useEffect(() => {
        const fetchAllJobTitle = async () => {
            await handleRequest(() => getAllJobTitle(), (res) => {
                setJobTitles(res.data);
            });
        };
        fetchAllJobTitle();
    }, []);

    const handleJobTitleChange = async (id) => {
        setJobSelected(id);
        await handleRequest(() => getApplicationsByFilter(id, "APPROVED"), (res) => {
            setApplicants(res.data);
        });
    };

    const handleSelectCandidate = (candidateId) => {
        setSelectedCandidates((prevSelected) =>
            prevSelected.includes(candidateId)
                ? prevSelected.filter((id) => id !== candidateId)
                : [...prevSelected, candidateId]
        );
    };

    const handleOk = () => {
        console.log("Danh sách ứng viên đã chọn:", selectedCandidates);
    };

    const columns = [
        {
            title: "Chọn",
            dataIndex: "id",
            key: "select",
            render: (id) => (
                <Checkbox
                    checked={selectedCandidates.includes(id)}
                    onChange={() => handleSelectCandidate(id)}
                />
            ),
        },
        {
            title: "Tên ứng viên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Tiêu đề công việc",
            dataIndex: "jobTitle",
            key: "jobTitle",
        },
        {
            title: "CV",
            dataIndex: "linkCv",
            key: "linkCv",
            render: (_, record) => (
                <a href={record?.resume?.link} target="_blank" rel="noopener noreferrer">
                    Xem CV
                </a>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },
    ];

    return (
        <div style={{ display: "flex", gap: "40px", padding: "40px" }}>
            {/* Phần Form bên trái */}
            <div style={{ flex: 1 }}>
                <Form onFinish={handleOk} form={form} layout="vertical">
                    <Form.Item label="Địa chỉ phỏng vấn" name="officeAddress">
                        <Input placeholder="Nhập địa chỉ văn phòng" />
                    </Form.Item>

                    <Form.Item label="Ghi chú phỏng vấn" name="interviewNote">
                        <Input placeholder="Nhập ghi chú phỏng vấn" />
                    </Form.Item>

                    <Form.Item label="Ngày phỏng vấn" name="interviewDate" rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}>
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Giờ bắt đầu" name="startTime" rules={[{ required: true, message: "Vui lòng chọn giờ bắt đầu!" }]}>
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Giờ kết thúc" name="endTime" rules={[{ required: true, message: "Vui lòng chọn giờ kết thúc!" }]}>
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Chọn công việc" name="jobTitle" rules={[{ required: true, message: "Vui lòng chọn chức danh!" }]}>
                        <Select onChange={handleJobTitleChange} placeholder="Chọn công việc">
                            {jobTitles?.map(job => (
                                <Select.Option key={job.id} value={job.id}>
                                    {job.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                        Tạo lịch phỏng vấn
                    </Button>
                </Form>
            </div>

            {/* Phần danh sách ứng viên bên phải */}
            <div style={{ flex: 1 }}>
                <h3>Danh sách ứng viên đủ điều kiện</h3>
                {jobSelected && applicants.length > 0 ? (
                    <Table dataSource={applicants} columns={columns} rowKey="id" pagination={false} />
                ) : (
                    <p>Chưa có ai ứng tuyển công việc này</p>
                )}
            </div>
        </div>
    );
};

export default CreateInterviewSchedulePage;
