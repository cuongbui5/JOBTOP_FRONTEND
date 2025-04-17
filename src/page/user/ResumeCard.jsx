import {Card, Button, Dropdown} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const ResumeCard = ({ resume,onEdit,onDelete,mainResumeId,onSetMainResume }) => {

    const isMainResume = mainResumeId === resume.id;


    const items = [
        {
            key: "edit",
            label: "Sửa",
            icon: <EditOutlined />,
            onClick: () => onEdit(resume),
        },
        {
            key: "delete",
            label: "Xóa",
            icon: <DeleteOutlined style={{ color: "red" }} />,
            danger: true,
            onClick: () => onDelete(resume?.id),
        },
    ];
    return (
        <Card
            hoverable
            style={{
                background: "#fff",
                border: "1px solid #999",
                overflow: "hidden",
                width: "100%"

            }}
            cover={

                <iframe
                    src={`${resume?.link}#toolbar=0&scrollbar=0`}
                    style={{
                        width: "100%",
                        height: 200,
                        border: "none",

                    }}
                />


            }
        >

                <div style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{display: "flex", alignItems: "center", gap: 5, maxWidth: "200px", flexShrink: 0}}>
                        <h3
                            style={{
                                margin: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%", // phần này nên nhỏ hơn tổng để còn chỗ cho icon
                            }}
                            title={resume?.name}
                        >
                            {resume?.name}
                        </h3>

                        <Dropdown menu={{items}} trigger={["click"]}>
                            <EditOutlined style={{fontSize: "14px", cursor: "pointer"}}/>
                        </Dropdown>
                    </div>

                    <div>
                        <Button
                            style={{
                                backgroundColor: isMainResume ? "#000" : "#ffffff",
                                color: isMainResume ? "#fff" : "#000",
                                fontWeight:"500"

                            }}
                            onClick={() => onSetMainResume(resume?.id)}
                        >
                            {isMainResume ? "Mặc định" : "Đặt làm hồ sơ mặc định"}
                        </Button>
                    </div>
                </div>



            <p style={{fontSize: "12px"}}>Cập nhật lần
                cuối {dayjs(resume.updatedAt).format("DD-MM-YYYY HH:mm")}</p>
        </Card>
    );
};

export default ResumeCard;
