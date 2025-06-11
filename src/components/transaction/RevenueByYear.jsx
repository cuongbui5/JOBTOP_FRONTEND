import { Card, DatePicker } from 'antd';
import { useState } from 'react';


import useApiRequest from "../../hooks/UseHandleApi.js";
import {getRevenueByYear} from "../../api/TransactionService.js"; // Hàm xử lý lỗi/loading

const RevenueByYear = () => {
    const [revenue, setRevenue] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const {handleRequest}=useApiRequest();
    const onChange = async (value) => {
        if (!value) {
            // ✅ Clear DatePicker: reset everything
            setRevenue(null);
            return;
        }
        setSelectedYear(value);

        if (value) {
            const year = value.year();

            await handleRequest(
                () => getRevenueByYear(year),
                (res) => {
                    setRevenue(res.data || 0);
                }
            );
        }
    };

    return (
        <Card title="Doanh thu theo năm" bordered>
            <DatePicker picker="year" onChange={onChange} value={selectedYear} />
            {revenue !== null && (
                <p style={{ marginTop: 10 }}>
                    Doanh thu: {revenue.toLocaleString()} VNĐ
                </p>
            )}
        </Card>
    );
};

export default RevenueByYear;
