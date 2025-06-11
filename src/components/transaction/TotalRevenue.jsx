import {useEffect, useState} from "react";
import {Card} from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getTotalRevenue} from "../../api/TransactionService.js";

const TotalRevenue = () => {
    const [revenue, setRevenue] = useState(0);
    const {handleRequest}=useApiRequest();

    useEffect(() => {
        const fetchTotalRevenue=async ()=>{
            await handleRequest(()=>getTotalRevenue(),(res)=>{
                console.log(res)
                setRevenue(res.data)
            })

        }
        fetchTotalRevenue();


    }, []);

    return (
        <Card title="Tổng doanh thu" bordered>
            <h2 style={{ fontSize: '24px', color: '#1890ff' }}>{revenue.toLocaleString()} VNĐ</h2>
        </Card>
    );
};

export default TotalRevenue;