import { useState } from "react";
import { Modal, Radio, Input, Button, Alert } from "antd";
import useModalStateStore from "../../store/ModalStateStore.js";
import useJobStore from "../../store/JobStore.jsx";

const ReportJobModal = () => {
    const [reason, setReason] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const {openReport,setOpenReport}=useModalStateStore(state => state)
    const {selectedJobId}=useJobStore(state => state);





    const reasons = [
        { value: "offensive", label: "Nội dung công việc mang tính phân biệt đối xử, xúc phạm" },
        { value: "fake", label: "Công việc có vẻ không có thật" },
        { value: "inaccurate", label: "Thông tin công việc không chính xác" },
        { value: "advertisement", label: "Đây là một quảng cáo" },
        { value: "other", label: "Khác" },
    ];

    const handleSubmit = () => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setOpenReport(false);
        }, 1500);
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
                        {item.label}
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
                loading={submitting}
                onClick={handleSubmit}
                style={{marginTop: 16}}
            >
                Báo cáo
            </Button>
        </Modal>
    );
};

export default ReportJobModal;
