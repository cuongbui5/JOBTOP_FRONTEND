
import { Modal, Form, Input, Rate, Button } from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getReviewByScheduleId, saveReview, updateReview} from "../../api/ReviewService.js";
import {useEffect, useState} from "react";
import CustomInputArea from "../../components/web/CustomInputArea.jsx";

// eslint-disable-next-line react/prop-types
const RatingModal = ({ visible, onClose,application }) => {
    const [form] = Form.useForm();
    const {handleRequest}=useApiRequest();
    const [reviewId,setReviewId]=useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    console.log(application);

    useEffect(() => {
        const fetchReviewBySchedule=async ()=>{
            await handleRequest(()=>getReviewByScheduleId(application?.interviewSchedule?.id),(res)=>{
                console.log(res)
                if(res.data!=null){
                    setReviewId(res.data.id)
                    form.setFieldsValue(res.data);
                    setIsUpdating(true);
                }


            })

        }
        if(visible){
            fetchReviewBySchedule();
        }


    }, [visible]);

    const handleOk = async () => {
        const values = await form.validateFields();
        if(!isUpdating){
            console.log(application);
            values.interviewScheduleId=application?.interviewSchedule?.id;
            values.jobId=application?.jobId;

            if (Object.values(values).some(value => value === null || value === undefined)) {
                return;
            }
            await handleRequest(()=>saveReview(values),(res)=>{
                console.log(res);
            },null,true)
        }else {
            await handleRequest(()=>updateReview(reviewId,values),(res)=>{
                console.log(res);
            },null,true)
        }

        onClose()

    };

    return (
        <Modal
            title={isUpdating ? "Cập nhật đánh giá" : "Đánh giá phỏng vấn"}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}

        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="rating"
                    label={<span style={{ fontSize: "small" }}>Chất lượng phỏng vấn của chúng tôi thế nào?</span>}
                    rules={[{ required: true, message: "Please provide a rating!" }]}
                >
                    <Rate />
                </Form.Item>
                <CustomInputArea name="comment" label="Đánh giá của bạn" line={6}/>
            </Form>
        </Modal>
    );
};

export default RatingModal;
