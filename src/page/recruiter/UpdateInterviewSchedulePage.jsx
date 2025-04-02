import { Button, DatePicker, Form, Input, TimePicker, Select } from "antd";
import { useEffect, useState } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import dayjs from "dayjs";
import { getScheduleById, updateSchedule } from "../../api/InterviewScheduleService.js";
import { useParams } from "react-router-dom";

const { Option } = Select;

const UpdateInterviewSchedulePage = () => {
    const [form] = Form.useForm();
    const { handleRequest } = useApiRequest();
    const { id } = useParams();

    // State to store schedule data
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const fetchScheduleById = async (id) => {
            await handleRequest(() => getScheduleById(id), (res) => {
                const scheduleData = res.data;
                setSchedule(scheduleData);  // Save the fetched data in the state
                form.setFieldsValue({
                    officeAddress: scheduleData.officeAddress,
                    interviewNote: scheduleData.interviewNote,
                    interviewDate: dayjs(scheduleData.interviewDate),
                    startTime: dayjs(scheduleData.startTime, "HH:mm:ss"),
                    endTime: dayjs(scheduleData.endTime, "HH:mm:ss"),
                    status: scheduleData.status
                });
            });
        };
        fetchScheduleById(id);
    }, [id]);

    const handleSubmit = async () => {
        const values = await form.validateFields();
        values.startTime = dayjs(values.startTime).format("HH:mm");
        values.endTime = dayjs(values.endTime).format("HH:mm");

        await handleRequest(() => updateSchedule(id, values), (res) => {
            console.log(res);
        }, null, true);
    };

    return (
        <div style={{ padding: "40px" }}>
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

                <Form.Item label="Trạng thái" name="status"
                           rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select placeholder="Chọn trạng thái">
                        <Option value="SCHEDULED">Đã lên lịch</Option>
                        <Option value="COMPLETED">Hoàn thành</Option>
                        <Option value="CANCELED_BY_RECRUITER">Hủy phỏng vấn</Option>
                    </Select>
                </Form.Item>
            </Form>

            <Button size={"large"} style={{ marginTop: 20 }} type="primary" onClick={handleSubmit}>
                Cập nhật lịch phỏng vấn
            </Button>
        </div>
    );
}

export default UpdateInterviewSchedulePage;
