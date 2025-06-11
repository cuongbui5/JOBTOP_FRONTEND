import { Card, DatePicker } from 'antd';
import { useState } from 'react';
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getRevenueByDate} from "../../api/TransactionService.js";


const RevenueByDate = () => {
    const [date, setDate] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const {handleRequest}=useApiRequest();

    const onChange =async (value) => {
        if (!value) {
            // ✅ Clear DatePicker: reset everything
            setRevenue(null);
            return;
        }
        setDate(value);
        const dateString = value.format("YYYY-MM-DD");
        await handleRequest(()=>getRevenueByDate(dateString),(res)=>{
            setRevenue(res.data)
        })

    };

    return (
        <Card title="Doanh thu theo ngày" bordered>
            <DatePicker onChange={onChange} />
            {revenue !== null && (
                <p style={{ marginTop: 10 }}>Doanh thu: {revenue.toLocaleString()} VNĐ</p>
            )}
        </Card>
    );
};

export default RevenueByDate;
