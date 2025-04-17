
import {Avatar, Button, List, Pagination, Typography} from "antd";
import {deleteNotification, getAllNotifications} from "../../api/NotificationService.js";
import {BellOutlined, CloseOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;
import useNotificationStore from "../../store/NotificationStore.js";
import {useEffect, useState} from "react";
import useHandleApi from "../../hooks/UseHandleApi.js";
import relativeTime from "dayjs/plugin/relativeTime";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
dayjs.extend(relativeTime);
const NotificationPage=()=>{
    const {notifications, setNotifications} = useNotificationStore(state => state);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const { handleRequest } = useHandleApi();

    const fetchNotifications = async (page = 1, size = 5) => {
        await handleRequest(
            () => getAllNotifications(page, size),
            (res) => {
                const data = res.data;
                setNotifications(data.content);
                setPagination({
                    current: data.currentPage , // backend trả về currentPage bắt đầu từ 0
                    pageSize: size,
                    total: data.totalElements,
                });
            },

        );

    };

    useEffect(() => {
         fetchNotifications(pagination.current, pagination.pageSize);
    }, []);



    const handlePageChange = async (pageNumber) => {
        await fetchNotifications(pageNumber, pagination.pageSize);
    };

    return (
        <ResponsiveContainer>
            <h2 style={{margin:"20px auto"}}>Thông báo của bạn</h2>
                <List
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    onClick={async () => {
                                        await handleRequest(() => deleteNotification(item?.id), (res) => {
                                            console.log(res)
                                            fetchNotifications(pagination.current, pagination.pageSize);
                                        });
                                    }}
                                    key={"delete"}
                                    type="text"
                                    icon={<CloseOutlined/>}
                                    size="small"

                                />

                            ]}

                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 8,
                                marginBottom: 8,
                                padding: 12,
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={<BellOutlined/>}
                                        style={{backgroundColor: "#1890ff"}}
                                    />
                                }
                                title={
                                    <Text strong type={item.read ? 'secondary' : 'default'}>
                                        {item.content}
                                    </Text>
                                }
                                description={
                                    <Text type="secondary" style={{fontSize: 12}}>
                                        {item.sender} • {dayjs(item.createdAt).fromNow()}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                    locale={{emptyText: 'Không có thông báo nào'}}
                />
                {pagination.total > pagination.pageSize && (
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Pagination
                            size="small"
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={handlePageChange}
                            style={{textAlign: 'center', marginTop: 20}}
                        />

                    </div>

                )}



        </ResponsiveContainer>
    )
}
export default NotificationPage;