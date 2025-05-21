import  { useState } from "react";
import { Input, Button } from "antd";
import {SearchOutlined} from "@ant-design/icons";

import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import JobListAI from "../../components/job/JobListAI.jsx";




const SearchAIPage = () => {
    const [inputValue, setInputValue] = useState(""); // value của input
    const [query, setQuery] = useState("");
    const handleSearch = () => {
        setQuery(inputValue);
    };


    return (
        <ResponsiveContainer>

            <h1 style={{margin: "20px 0",textAlign:"center"}}>Tìm kiếm công việc bằng AI</h1>

            <div
                style={{
                    display: "flex",
                    maxWidth: "1000px",
                    margin: "20px auto",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    padding: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        borderRight: "1px solid #f0f0f0",
                        paddingLeft: "10px",
                    }}
                >
                    <SearchOutlined style={{color: "#bfbfbf", marginRight: "8px"}}/>
                    <Input
                        placeholder="Mô tả công việc theo ý của bạn"
                        variant={"borderless"}
                        style={{
                            fontSize: "16px",
                            width: "100%",
                        }}
                        onChange={(e) => setInputValue(e.target.value)}

                    />
                </div>



                <Button
                    type="primary"
                    style={{
                        backgroundColor: "#1e5bb0",
                        borderColor: "#1e5bb0",
                        height: "40px",
                        width: "100px",
                        fontSize: "16px",
                        fontWeight: 500,
                        marginLeft: "10px",
                    }}
                    onClick={handleSearch}

                >
                    Tìm việc
                </Button>
            </div>
            <div style={{marginTop:40}}>
                <h2>{query!==""?"Kết quả tìm kiếm: "+query:"Tất cả công việc"}</h2>
                <JobListAI query={query}/>

            </div>









        </ResponsiveContainer>
    );
};

export default SearchAIPage;
