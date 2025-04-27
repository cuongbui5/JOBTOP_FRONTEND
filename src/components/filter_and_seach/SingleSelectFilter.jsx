"use client"

import { useState } from "react"
import { Button, Popover, Radio, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"

// eslint-disable-next-line react/prop-types
export default function SingleSelectFilter({items, initialSelectedId , onApply, placeholder, labelKey, valueKey}) {
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(initialSelectedId)
    const [tempSelectedId, setTempSelectedId] = useState(initialSelectedId)

    // Lấy tên item từ ID
    const getItemName = (id) => {
        if (!id) return null
        const item = items.find((item) => String(item[valueKey]) === String(id))
        return item ? item[labelKey] : null
    }

    // Xử lý khi click vào radio
    const handleRadioChange = (e) => {
        setTempSelectedId(e.target.value)
    }

    // Xử lý khi click nút Áp dụng
    const handleApply = () => {
        setSelectedId(tempSelectedId)
        onApply(tempSelectedId)
        setOpen(false)
    }

    // Xử lý khi click nút Xóa lựa chọn
    const handleClear = () => {
        setTempSelectedId(null)
    }

    // Debug để kiểm tra giá trị
    //console.log("tempSelectedId:", tempSelectedId)
    //console.log("items:", items)

    // Nội dung của popover
    const content = (
        <div style={{ width: 300 }}>
            <div style={{ borderBottom: "1px solid #f0f0f0", padding: "8px 16px" }}>
                <div style={{ fontWeight: 500 }}>{placeholder}</div>
            </div>

            <div style={{ maxHeight:300, overflow: "auto", padding: "8px 0" }}>
                <Radio.Group value={tempSelectedId} onChange={handleRadioChange} style={{ width: "100%" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {items.map((item) => (
                            <div key={String(item[valueKey])} style={{ padding: "8px 16px", width: "100%" }}>
                                <Radio value={item[valueKey]} style={{ width: "100%" }}>
                                    {item[labelKey]}
                                </Radio>
                            </div>
                        ))}
                    </Space>
                </Radio.Group>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 16px",
                    borderTop: "1px solid #f0f0f0",
                }}
            >
                <Button size="small" onClick={handleClear}>
                    Xóa lựa chọn
                </Button>
                <Button size="small" type="primary" onClick={handleApply}>
                    Áp dụng
                </Button>
            </div>
        </div>
    )

    return (
        <Popover
            content={content}
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            placement="bottom"

        >
            <Button size="large"  icon={<DownOutlined />} iconPosition="end">
                {getItemName(selectedId) || placeholder}
            </Button>
        </Popover>
    )
}
