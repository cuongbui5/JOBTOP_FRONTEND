import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403 - Không có quyền truy cập"
            subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Quay về trang chủ
                </Button>
            }
        />
    );
};

export default UnauthorizedPage;
