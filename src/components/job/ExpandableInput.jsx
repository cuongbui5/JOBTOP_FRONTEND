import { useState } from "react";
import { Space, Button, Input, Dropdown } from "antd";
import { DownOutlined, PlusCircleFilled } from "@ant-design/icons";
import { createTag } from "../../api/TagService.js";
import { createIndustry } from "../../api/IndustryService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {useWebStore} from "../../store/WebStore.jsx";


const ExpandableInput = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(null); // "tag" hoặc "industry"
    const {handleRequest}=useApiRequest();
    const {tags,industries}=useWebStore(state => state)

    const handleMenuClick = ({ key }) => {
        setSelectedOption(key);
        setInputValue("");
    };

    const handleAdd = async () => {
        if (!selectedOption || !inputValue.trim()) return; // Tránh lỗi khi input rỗng

        if (selectedOption === "tag") {
            await handleRequest(() => createTag({ name: inputValue }), (res) => {
                tags.add(res.data)
                setInputValue("");
                setSelectedOption(null);
            });
        } else {
            await handleRequest(() => createIndustry({ name: inputValue }), (res) => {
                industries.add(res.data)
                setInputValue("");
                setSelectedOption(null);
            });
        }
    };

    const items = [
        { key: "tag", label: "Thêm Tag", icon: <PlusCircleFilled /> },
        { key: "industry", label: "Thêm Ngành Nghề", icon: <PlusCircleFilled /> },
    ];

    return (
        <Space>
            <div>
                <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
                    <Button type={selectedOption ? "primary" : "default"}>
                        {selectedOption ? (selectedOption === "tag" ? "Tag" : "Ngành Nghề") : "Chọn tùy chọn"}
                        <DownOutlined />
                    </Button>
                </Dropdown>

                {selectedOption && (
                    <div style={{ marginTop: "10px" }}>
                        <Input
                            placeholder={`Nhập ${selectedOption === "tag" ? "Tag" : "Ngành Nghề"}`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Space style={{ marginTop: "5px" }}>
                            <Button type="primary" onClick={handleAdd}>
                                Thêm
                            </Button>
                            <Button danger onClick={() => setSelectedOption(null)}>
                                Hủy
                            </Button>
                        </Space>
                    </div>
                )}
            </div>
        </Space>
    );
};

export default ExpandableInput;
