import {Card, Button, Dropdown} from "antd";
import {StarOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
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
                background:"rgba(0,0,0,0.4)",
                border:"1px solid #999",
                overflow:"hidden",
                width:"100%"

            }}
            cover={

                    <iframe
                        src={`${resume?.link}#toolbar=0&scrollbar=0`}
                        style={{
                            width: "100%",
                            height:200,
                            border: "none",

                        }}
                    />


            }
        >
            <div style={{color: "white", height:"100%",width:"100%",display:"flex",justifyContent:"space-between"}}>
                <div>
                    <h3 style={{display: "flex", alignItems: "center", gap: 5}}>
                        {resume?.name}
                        <Dropdown
                            menu={{items}}
                            trigger={["click"]}
                        >
                            <EditOutlined style={{fontSize: "14px", cursor: "pointer"}}/>
                        </Dropdown>
                    </h3>
                    <p style={{fontSize: "12px"}}>Cập nhật lần
                        cuối {dayjs(resume.updatedAt).format("DD-MM-YYYY HH:mm")}</p>

                </div>


                <div>
                    <Button
                        icon={<StarOutlined />}
                        style={{
                            backgroundColor: isMainResume ? "#FFD700" : "#ffffff",
                            color: isMainResume ? "#000" : "#000",
                            border: "none",
                        }}
                        onClick={() => onSetMainResume(resume?.id)}
                    >
                        {isMainResume ? "CV chính" : "Đặt làm CV chính"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ResumeCard;
