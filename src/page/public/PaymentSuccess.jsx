
import { Result, Button } from 'antd';

const PaymentSuccess = () => {
    const handleGoHome = () => {
        // Định hướng về trang chủ
        window.location.href = "/";
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="success"
                title="Thanh toán thành công"
                subTitle="Thanh toán của bạn đã được hoàn tất thành công."
                extra={[
                    <Button type="primary" key="home" onClick={handleGoHome}>
                        Về trang chủ
                    </Button>,
                ]}
                style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}
            />
        </div>
    );
};

export default PaymentSuccess;
