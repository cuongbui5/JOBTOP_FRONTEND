import { Form, Select} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import dayjs from "dayjs";
import {createInterViewSchedule, getScheduleById, updateSchedule} from "../../api/InterviewScheduleService.js";
import CustomInputItem from "../../components/web/CustomInputItem.jsx";
import CustomInputArea from "../../components/web/CustomInputArea.jsx";
import CustomInputDate from "../../components/web/CustomInputDate.jsx";
import CustomInputTime from "../../components/web/CustomInputTime.jsx";
import CustomButton from "../../components/web/CustomButton.jsx";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import {useParams} from "react-router-dom";
import CustomSelectItem from "../../components/web/CustomSelectItem.jsx";
import {getDay} from "../../utils/helper.js";
const { Option } = Select;
const InterviewScheduleForm = () => {
    const [form] = Form.useForm();
    const {handleRequest} = useApiRequest();
    const { id } = useParams();


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
        if(id){
            fetchScheduleById(id);

        }

    }, [id]);




    const handleSubmit = async (values) => {
        values.startTime=dayjs(values.startTime).format("HH:mm")
        values.endTime=dayjs(values.endTime).format("HH:mm")
        values.interviewDate=getDay(values.interviewDate);
        if(id){
            await handleRequest(() => updateSchedule(id, values), (res) => {
                console.log(res);
            }, null, true);

        }else {
            await handleRequest(()=>createInterViewSchedule(values),(res)=>{
                console.log(res);

            },null,true)

        }



    };


    return (
        <ResponsiveContainer>
            <h1 style={{marginBottom: 20}}>{id?"Cập nhật lịch phỏng vấn":"Tạo lịch phỏng vấn"}</h1>
            <Form onFinish={handleSubmit} form={form} layout="vertical">
                <CustomInputItem label="Địa chỉ phỏng vấn" name="officeAddress"/>
                <CustomInputArea label="Ghi chú phỏng vấn" name="interviewNote" line={5}/>
                <CustomInputDate label="Ngày phỏng vấn" name="interviewDate"/>
                <CustomInputTime label="Giờ bắt đầu" name="startTime"/>
                <CustomInputTime label="Giờ kết thúc" name="endTime"/>
                {id&&<CustomSelectItem label="Trạng thái" name="status">
                    <Option value="SCHEDULED">Đã lên lịch</Option>
                    <Option value="COMPLETED">Hoàn thành</Option>
                    <Option value="CANCELED_BY_RECRUITER">Hủy phỏng vấn</Option>
                </CustomSelectItem>}


                <Form.Item>
                    <CustomButton type={"primary"} size={"large"} content={id?"Cập nhật":"Tạo lịch phỏng vấn"}/>
                </Form.Item>

            </Form>


        </ResponsiveContainer>

    );
};

export default InterviewScheduleForm;
