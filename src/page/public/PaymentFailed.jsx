import { Result, Button } from 'antd';

const PaymentFailure = () => {
    const handleRetry = () => {
        // Xử lý thử lại thanh toán
        alert('Retry payment!');
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="error"
                title="Thanh toán thất bại"
                subTitle="Đã có sự cố trong quá trình thanh toán. Vui lòng thử lại."
                extra={[
                    <Button key="home" onClick={() => window.location.href = "/"}>
                        Về trang chủ
                    </Button>,
                ]}
                style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}
            />
        </div>
    );
};

export default PaymentFailure;
