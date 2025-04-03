
import { Modal, Form, Input, Rate, Button } from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getReviewBySlotId, saveReview, updateReview} from "../../api/ReviewService.js";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
const InterviewRatingModal = ({ visible, onClose,slot }) => {
    const [form] = Form.useForm();
    const {handleRequest}=useApiRequest();
    const [reviewId,setReviewId]=useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if(slot?.id){
            handleRequest(()=>getReviewBySlotId(slot.id),(res)=>{
                if (res?.data) {
                    setReviewId(res.data.id)
                    form.setFieldsValue(res.data); // Điền dữ liệu vào form
                    setIsUpdating(true); // Đánh dấu là update
                } else {
                    form.resetFields(); // Xóa form nếu không có dữ liệu
                    setIsUpdating(false);
                }
            })
        }
    }, [slot]);

    const handleOk = async () => {
        const values = await form.validateFields();
        if(!isUpdating){

            values.slotId=slot?.id;
            values.jobId=slot?.jobId;
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
            title={isUpdating ? "Cập nhật đánh giá" : "Thêm đánh giá"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="rating"
                    label="Chất lượng phỏng vấn của chúng tôi thế nào?"
                    rules={[{ required: true, message: "Please provide a rating!" }]}
                >
                    <Rate />
                </Form.Item>
                <Form.Item
                    name="comment"
                    label="Có gì không hài lòng, vui lòng để lại lời nhắn"
                    rules={[{ required: true, message: "Please leave a comment!" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleOk}>
                        {isUpdating ? "Cập nhật" : "Đánh giá"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default InterviewRatingModal;
