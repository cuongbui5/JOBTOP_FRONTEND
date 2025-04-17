import { useState } from "react"
import { Button, Checkbox, Popover, Tag, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"

// eslint-disable-next-line react/prop-types
export default function MultiSelectFilter({items, initialSelectedIds , onApply, placeholder , labelKey , valueKey }) {
    const [open, setOpen] = useState(false)
    const [selectedIds, setSelectedIds] = useState(initialSelectedIds)
    const [tempSelectedIds, setTempSelectedIds] = useState(initialSelectedIds)

    // Lấy tên item từ ID
    const getItemName = (id) => {
        const item = items?.find((item) => item[valueKey] === id)
        return item ? item[labelKey] : ""
    }

    // Xử lý khi click vào checkbox
    const handleCheckboxChange = (itemId) => {
        setTempSelectedIds((prev) => {
            if (prev.includes(itemId)) {
                return prev.filter((id) => id !== itemId)
            } else {
                return [...prev, itemId]
            }
        })
    }

    // Xử lý khi click nút Áp dụng
    const handleApply = () => {
        setSelectedIds(tempSelectedIds)
        onApply(tempSelectedIds)
        setOpen(false)
    }

    // Xử lý khi click nút Xóa lựa chọn
    const handleClear = () => {
        setTempSelectedIds([])
    }

    // Xóa một lựa chọn cụ thể
    const handleRemoveSelection = (itemId) => {
        const newSelection = tempSelectedIds.filter((id) => id !== itemId)
        setTempSelectedIds(newSelection)
    }

    // Nội dung của popover
    const content = (
        <div style={{ width: 300 }}>
            <div style={{ borderBottom: "1px solid #f0f0f0", padding: "8px" }}>
                <div style={{ fontWeight: 500 }}>{placeholder}</div>
                <div style={{ marginTop: 8 }}>
                    <Space size={[0, 4]} wrap>
                        {tempSelectedIds.map((id) => (
                            <Tag key={id} closable onClose={() => handleRemoveSelection(id)} style={{ marginRight: 4 }}>
                                {getItemName(id)}
                            </Tag>
                        ))}
                    </Space>
                </div>
            </div>

            <div style={{ maxHeight:200, overflow: "auto", padding: "8px 0" }}>
                {items?.map((item) => (
                    <div key={item[valueKey]} style={{ padding: "8px 16px" }}>
                        <Checkbox
                            checked={tempSelectedIds.includes(item[valueKey])}
                            onChange={() => handleCheckboxChange(item[valueKey])}
                        >
                            {item[labelKey]}
                        </Checkbox>
                    </div>
                ))}
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
                    Áp dụng {tempSelectedIds.length > 0 && `(${tempSelectedIds.length})`}
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
            styles={{ root: {padding: 0} }}

        >
            <Button size="large"  icon={<DownOutlined />} iconPosition="end">
                <div style={{display: "flex", alignItems: "center"}}>
                    <span>{placeholder} {selectedIds.length>0&&<span>({selectedIds.length})</span>}</span>

                </div>
            </Button>
        </Popover>
    )
}
