import {Button, DatePicker, Form, Input, Select, TimePicker, Table, Checkbox, Col, Row} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobTitle} from "../../api/JobService.js";
import {getApplicationsByFilter} from "../../api/ApplicationService.js";
import dayjs from "dayjs";
import {createInterViewSchedule} from "../../api/InterviewScheduleService.js";

const CreateInterviewSchedulePage = () => {
    const [form] = Form.useForm();
    const [applicants, setApplicants] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const {handleRequest} = useApiRequest();

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



    const handleSubmit = async () => {
        const values = await form.validateFields();
        values.startTime=dayjs(values.startTime).format("HH:mm")
        values.endTime=dayjs(values.endTime).format("HH:mm")

        await handleRequest(()=>createInterViewSchedule({...values,applicationIds:selectedCandidates}),(res)=>{
            console.log(res);

        },null,true)
        console.log("Thông tin đã nhập:", values);
        console.log("Danh sách ứng viên đã chọn:", selectedCandidates);
    };
    const columns = [
        {
            title: "Chọn",
            dataIndex: "id",
            key: "select",
            responsive: ["xs", "sm", "md", "lg", "xl"],
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
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            responsive: ["xs", "sm", "md", "lg", "xl"],

        },
        {
            title: "CV",
            dataIndex: "linkCv",
            key: "linkCv",
            responsive: ["md", "lg", "xl"],
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
            responsive: ["md", "lg", "xl"],
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdAt",
            key: "createdAt",
            responsive: [ "sm", "md", "lg", "xl"],
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },
    ];

    return (
        <div style={{padding: "40px"}}>
            <h1 style={{marginBottom:20}}>Tạo lịch phỏng vấn</h1>
            <Row gutter={[40, 40]}>
                {/* Cột Form bên trái */}
                <Col xs={24} lg={12}>
                    <Form form={form} layout="vertical">
                        <Form.Item label="Địa chỉ phỏng vấn" name="officeAddress">
                            <Input placeholder="Nhập địa chỉ văn phòng" />
                        </Form.Item>

                        <Form.Item label="Ghi chú phỏng vấn" name="interviewNote">
                            <Input placeholder="Nhập ghi chú phỏng vấn" />
                        </Form.Item>

                        <Form.Item label="Ngày phỏng vấn" name="interviewDate"
                                   rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label="Giờ bắt đầu" name="startTime"
                                   rules={[{ required: true, message: "Vui lòng chọn giờ bắt đầu!" }]}>
                            <TimePicker format="HH:mm" style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label="Giờ kết thúc" name="endTime"
                                   rules={[{ required: true, message: "Vui lòng chọn giờ kết thúc!" }]}>
                            <TimePicker format="HH:mm" style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label="Chọn công việc" name="jobTitle"
                                   rules={[{ required: true, message: "Vui lòng chọn chức danh!" }]}>
                            <Select onChange={handleJobTitleChange} placeholder="Chọn công việc">
                                {jobTitles?.map(job => (
                                    <Select.Option key={job.id} value={job.id}>
                                        {job.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>

                {/* Cột danh sách ứng viên bên phải */}
                <Col xs={24} lg={12}>
                    <h2>Danh sách ứng viên đủ điều kiện</h2>
                    <Table dataSource={applicants} columns={columns} rowKey="id" pagination={false} />
                </Col>
            </Row>
            <Row justify="end">
                <Col>
                    <Button size={"large"} style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>
                        Tạo lịch phỏng vấn
                    </Button>
                </Col>
            </Row>

        </div>

    );
};

export default CreateInterviewSchedulePage;
