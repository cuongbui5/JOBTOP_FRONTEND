// NotificationPopover.jsx
import {BellOutlined, CloseOutlined} from '@ant-design/icons';
import {Badge, Popover, List, Typography, Pagination, Avatar, Button} from 'antd';
import { useState } from 'react';
import useHandleApi from "../../hooks/UseHandleApi.js";
import {deleteNotification, getAllNotifications} from "../../api/NotificationService.js";

import relativeTime from "dayjs/plugin/relativeTime";
import useNotificationStore from "../../store/NotificationStore.js";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
const { Text } = Typography;

const NotificationPopover = () => {
    const {notifications, setNotifications,hasNotification} = useNotificationStore(state => state);
    const [visible, setVisible] = useState(false);
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

    const handleVisibleChange = async (v) => {
        setVisible(v);
        if (v) {
            await fetchNotifications(1, pagination.pageSize);
        }
    };

    const handlePageChange = async (pageNumber) => {
        await fetchNotifications(pageNumber, pagination.pageSize);
    };



    return (
        <Popover
            title="Thông báo"
            trigger="click"
            placement="bottomRight"
            open={visible}
            onOpenChange={handleVisibleChange}
            content={
                <div style={{ width: 600 }}>

                            <List
                                dataSource={notifications}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                                <Button
                                                    onClick={async ()=>{
                                                        await handleRequest(()=>deleteNotification(item?.id),(res)=>{
                                                            console.log(res)
                                                            fetchNotifications(pagination.current,pagination.pageSize);
                                                        });
                                                    }}
                                                    key={"delete"}
                                                    type="text"
                                                    icon={<CloseOutlined />}
                                                    size="small"

                                                />

                                        ]}

                                        style={{
                                            backgroundColor:  "#fff",
                                            borderRadius: 8,
                                            marginBottom: 8,
                                            padding: 12,
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    icon={<BellOutlined />}
                                                    style={{ backgroundColor: "#1890ff" }}
                                                />
                                            }
                                            title={
                                                <Text strong type={item.read ? 'secondary' : 'default'}>
                                                    {item.content}
                                                </Text>
                                            }
                                            description={
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {item.sender} • {dayjs(item.createdAt).fromNow()}
                                                </Text>
                                            }
                                        />
                                    </List.Item>
                                )}
                                locale={{ emptyText: 'Không có thông báo nào' }}
                            />
                            {pagination.total > pagination.pageSize && (
                                <Pagination
                                    size="small"
                                    current={pagination.current}
                                    pageSize={pagination.pageSize}
                                    total={pagination.total}
                                    onChange={handlePageChange}
                                    style={{ textAlign: 'center', marginTop: 10 }}
                                />
                            )}


                </div>
            }
        >
            <Badge dot={hasNotification}>
                <p style={{color:"#ddd"}}>Thông báo</p>
            </Badge>
        </Popover>
    );
};

export default NotificationPopover;
