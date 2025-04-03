import { useState } from "react";
import { Modal, Radio, Input, Button, Alert } from "antd";
import useModalStateStore from "../../store/ModalStateStore.js";
import useJobStore from "../../store/JobStore.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {createReport} from "../../api/ReportService.js";

const ReportModal = () => {
    const [reason, setReason] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const {openReport,setOpenReport}=useModalStateStore(state => state)
    const {selectedJobId}=useJobStore(state => state);
    const {handleRequest}=useApiRequest();





    const reasons = [
        {  value: "Nội dung công việc mang tính phân biệt đối xử, xúc phạm" },
        {  value: "Công việc có vẻ không có thật" },
        { value: "Thông tin công việc không chính xác" },
        {  value: "Đây là một quảng cáo" },
        {  value: "Khác" },
    ];

    const handleSubmit =async () => {
        console.log(selectedJobId)
        console.log(additionalInfo)
        console.log(reason)

        await handleRequest(()=>createReport({jobId:selectedJobId,additionalInfo,reason}),(res)=>{
            console.log(res)
        },null,true)
        setOpenReport(false);



    };

    return (
        <Modal
            title={`Report Job #${selectedJobId}`}
            open={openReport}
            onCancel={()=>setOpenReport(false)}
            footer={null}
        >
            <Radio.Group
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                style={{display: "flex", flexDirection: "column", gap: 8}}
            >
                {reasons.map((item) => (
                    <Radio key={item.value} value={item.value}>
                        {item.value}
                    </Radio>
                ))}
            </Radio.Group>

            <div style={{marginTop: 16, fontWeight: 600}}>Thông tin bổ sung</div>
            <Input.TextArea
                rows={3}
                maxLength={300}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Nhập thêm thông tin nếu có (không bắt buộc)"
            />

            <Alert
                message="Bảo vệ quyền riêng tư của bạn"
                description="Tránh tiết lộ thông tin cá nhân như tên, số điện thoại hoặc bất kỳ chi tiết nào có thể nhận dạng bạn."
                type="info"
                showIcon
                style={{marginTop: 16}}
            />

            <Button
                type="primary"
                block

                onClick={handleSubmit}
                style={{marginTop: 16}}
            >
                Báo cáo
            </Button>
        </Modal>
    );
};

export default ReportModal;
