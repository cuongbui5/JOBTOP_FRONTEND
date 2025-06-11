import { Card, DatePicker } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import {getRevenueByMonth} from "../../api/TransactionService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
 // nếu bạn dùng hàm xử lý chung

const RevenueByMonth = () => {
    const [revenue, setRevenue] = useState(null);
    const [date, setDate] = useState(null);

    const {handleRequest}=useApiRequest();
    const onChange = async (value) => {
        if (!value) {
            // ✅ Clear DatePicker: reset everything
            setRevenue(null);
            return;
        }
        setDate(value);

        if (value) {
            const month = value.month() + 1; // dayjs: Jan = 0
            const year = value.year();

            await handleRequest(
                () => getRevenueByMonth(month, year),
                (res) => {
                    setRevenue(res.data || 0);
                }
            );
        }
    };

    return (
        <Card title="Doanh thu theo tháng" bordered>
            <DatePicker picker="month" onChange={onChange} value={date} />
            {revenue !== null && (
                <p style={{ marginTop: 10 }}>
                    Doanh thu: {revenue.toLocaleString()} VNĐ
                </p>
            )}
        </Card>
    );
};

export default RevenueByMonth;
