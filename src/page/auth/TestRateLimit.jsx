import {Button, InputNumber, List, Spin} from "antd";
import {useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllJobs} from "../../api/JobService.js";

const TestRateLimit=()=>{
    const [requestCount, setRequestCount] = useState(5);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const {handleRequest}=useApiRequest();

    const handleTest = async () => {
        setLoading(true);
        const tempResults = [];

        for (let i = 0; i < requestCount; i++) {
            await handleRequest(()=>getAllJobs(1,20),(res)=>{
                tempResults.push(res);
            })
        }

        setResults(tempResults);
        setLoading(false);
    };

    return (
        <div style={{padding: 24, maxWidth: 500, margin: "0 auto"}}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <h1 style={{textAlign: "center", marginBottom: 24}}>
                Test Rate Limit
            </h1>

            <div style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 24}}>
                <InputNumber
                    min={1}
                    value={requestCount}
                    onChange={(value) => setRequestCount(value)}
                    style={{width: 100}}
                />
                <Button
                    type="primary"
                    onClick={handleTest}
                    disabled={loading}
                    style={{minWidth: 100}}
                >
                    {loading ? <Spin size="small"/> : "Start Test"}
                </Button>
            </div>

            <List
                bordered
                dataSource={results}
                renderItem={(item, index) => (
                    <List.Item
                        style={{
                            backgroundColor: item.success ? "#f6ffed" : "#fff1f0",
                            color: item.success ? "#52c41a" : "#ff4d4f",
                            fontWeight: "bold",
                        }}
                    >
                        Request {index + 1}: {item.status===200 ? "Success" : "Failed"} (Status {item.status})
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TestRateLimit;