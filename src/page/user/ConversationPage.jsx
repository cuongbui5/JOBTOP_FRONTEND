import {useEffect, useRef, useState} from "react";
import {List, Avatar, Typography, Button, Input, Form, Badge} from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllConversations} from "../../api/ConversationService.js";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import {getStoredUser} from "../../utils/helper.js";
import {createMessage, getAllMessageByConversationId} from "../../api/MessageService.js";
import {useMediaQuery} from "react-responsive";

import useMessageStore from "../../store/MessageStore.js";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";


dayjs.extend(isToday);
dayjs.extend(isYesterday);

const {  Text } = Typography;

const groupMessagesByDate = (messages) => {
    const grouped = {};

    messages.forEach(msg => {
        const date = dayjs(msg.createdAt);

        let label;
        if (date.isToday()) {
            label = "Hôm nay";
        } else if (date.isYesterday()) {
            label = "Hôm qua";
        } else {
            label = date.format("DD/MM/YYYY");
        }

        if (!grouped[label]) {
            grouped[label] = [];
        }
        grouped[label].push(msg);
    });

    return grouped;
};

const ConversationPage = () => {
    const {
        conversations,
        setConversations,
        selectedConversationId,
        setSelectedConversationId,
        messages,
        setMessages,
        addMessage,
        addMessages,
        unreadConversationIds,
        removeUnreadConversationId
    }=useMessageStore(state => state);
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0);
    const [form] = Form.useForm();
    const [name,setName]=useState(null);
    const {handleRequest}=useApiRequest();
    const user=getStoredUser();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [loadMore,setLoadMore]=useState(false);
    const role=getStoredUser().roles[0].name;

    useEffect(() => {
        console.log("Scroll")

        // Tự động cuộn xuống khi có tin nhắn mới
        if (messagesEndRef.current) {
            console.log("Scroll x")
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }

    }, [messages]);

    useEffect(()=>{
        const fetchConversations = async () => {
            await handleRequest(()=>getAllConversations(),(res)=>{
                console.log(res)
                setConversations(res.data)
            },"fetch-conversations")

        };
        fetchConversations();
        return () => {
            setSelectedConversationId(null);
        };
    },[])










    useEffect(() => {
        const fetchMessages = async (cid, page, isLoadMore = false) => {
            const container = messagesContainerRef.current;

            // Ghi lại chiều cao trước khi load thêm
            const prevScrollHeight = isLoadMore && container ? container.scrollHeight : null;

            await handleRequest(
                () => getAllMessageByConversationId(cid, page),
                (res) => {
                    if (isLoadMore) {
                        addMessages(res.data.content); // prepend tin nhắn
                    } else {
                        setMessages(res.data.content); // load lần đầu
                    }
                    setCurrentPage(res.data.currentPage);
                    setTotalPages(res.data.totalPages);
                },
                "fetch-message"
            ).then(() => {
                // Sau khi tin nhắn được cập nhật
                if (isLoadMore && container && prevScrollHeight) {
                    // Tính chiều cao mới và đặt scrollTop sao cho người dùng không thấy giật
                    const newScrollHeight = container.scrollHeight;
                    container.scrollTop = newScrollHeight - prevScrollHeight;
                } else {
                    if (container) {
                        container.scrollTop = container.scrollHeight;
                    }
                }
            });
        };


        if (selectedConversationId) {
            fetchMessages(selectedConversationId, currentPage, loadMore);
        }
    }, [currentPage, selectedConversationId]);



    const handleSelectConversation = (conversation) => {
        setName(conversation?.email||conversation?.companyName)
        setSelectedConversationId(conversation.id);
        removeUnreadConversationId(conversation.id)
      
    };

    async function handleFinish(values) {
        console.log(values)
        if (!values.message.trim()) return;
        await handleRequest(()=>createMessage({conversationId:selectedConversationId,content:values.message.trim()}),(res)=>{
            console.log(res);
            addMessage(res.data)

        })
        form.resetFields();
    }




    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;

        // Nếu scroll lên trên và còn trang để load
        if (container.scrollTop === 0 && currentPage < totalPages) {
            setLoadMore(true);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                minHeight: "90vh",
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                overflow: "hidden",

            }}
        >
            {/* Sidebar */}
            <div
                style={{
                    width: isMobile ? "100%" : "30%",
                    borderRight: isMobile ? "none" : "1px solid #e8e8e8",
                    borderBottom: isMobile ? "1px solid #e8e8e8" : "none",
                    overflowY: "auto",
                    padding:"10px",
                    flexShrink: 0,
                }}
            >
                <h1 style={{ marginBottom: 20,marginLeft:"10px"}}>
                    Đoạn chat
                </h1>

                <LoadingWrapper loadingType={"fetch-conversations"}>
                    {/* Avatar scroll only for mobile */}
                    {isMobile && (
                        <div
                            style={{
                                display: "flex",
                                overflowX: "auto",
                                gap: 12,
                                marginBottom: 12,
                            }}
                        >
                            {conversations.map((item) => {
                                const isUnread = unreadConversationIds.has(item.id);
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelectConversation(item)}
                                        style={{
                                            cursor: "pointer",
                                            position: "relative",
                                            border:
                                                selectedConversationId === item.id
                                                    ? "2px solid #1890ff"
                                                    : "2px solid transparent",
                                            borderRadius: "50%",
                                            padding: 4,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Badge dot={isUnread}>
                                            <Avatar
                                                src={ role==="USER"? item?.companyLogo : item?.userAvatar || "/images/user_default.png"}
                                                size={50}
                                            />
                                        </Badge>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Full list for desktop */}
                    {!isMobile && (
                        <List
                            itemLayout="horizontal"
                            dataSource={conversations}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => handleSelectConversation(item)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedConversationId === item.id ? "#ddd" : "",
                                        borderRadius: 6,
                                        marginBottom: 8,
                                        padding: 8,
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge dot={unreadConversationIds.has(item.id)}>
                                                <Avatar
                                                    style={{
                                                        border: "1px solid #999",
                                                        padding: 2,
                                                        backgroundColor: "#fff"
                                                    }}
                                                    src={role==="USER"? item?.companyLogo : item?.userAvatar|| "/images/user_default.png"}
                                                    size={50}
                                                />
                                            </Badge>
                                    }
                                        title={
                                            <h3 style={{color:"#555"}}>  {role==="USER"?  item?.companyName :item?.email|| "Unknown"}</h3>

                                    }
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </LoadingWrapper>
            </div>

            {/* Right panel */}
            <div
                style={{
                    flex: 1,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    width: isMobile ? "100%" : "70%",
                }}
            >
                {selectedConversationId ? (
                    <>
                        <div>
                            <List
                                ref={messagesContainerRef}
                                style={{ width: "100%",maxHeight:isMobile?"55vh":"80vh", minHeight:isMobile?"55vh":"80vh",overflowY: "auto", flex: 1 }}
                                dataSource={messages}
                                onScroll={handleScroll}
                                renderItem={(msg,index) => {
                                    const isMine = msg?.sender === user.email;
                                    return (
                                        <List.Item
                                            style={{
                                                display: "flex",
                                                justifyContent: isMine ? "flex-end" : "flex-start",
                                                marginBottom: 8,
                                            }}
                                            ref={index === messages.length - 1 ? messagesEndRef : null}
                                        >
                                            <div
                                                style={{
                                                    padding: "5px 10px",
                                                    borderRadius: 8,
                                                    backgroundColor: isMine ? "#1890ff" : "#999",
                                                    color: "#fff",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                                                    {isMine ? "Bạn" : name}
                                                </p>
                                                <p style={{ fontSize: "16px" }}>{msg.content}</p>
                                            </div>
                                        </List.Item>
                                    );
                                }}
                            />
                            <Form
                                form={form}
                                onFinish={handleFinish}
                                style={{ width:"100%",display: "flex", gap: 8,alignItems:"center",marginTop:"20px" }}
                            >
                                <Form.Item name="message" style={{width:"100%"}}>
                                    <Input
                                        placeholder="Nhập tin nhắn..."

                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button  type="primary" htmlType="submit">
                                        Gửi
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>



                        {/* Input message */}

                    </>
                ) : (
                    <Text>Chọn một đoạn hội thoại để xem chi tiết</Text>
                )}
            </div>
        </div>
    );
};

export default ConversationPage;
{
    /*
     Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => {
                                    return (
                                        <div key={date}>
                                            <div style={{textAlign: "center", margin: "12px 0", color: "#888"}}>
                                                <Text type="secondary">{date}</Text>
                                            </div>
                                            {msgs.map((msg) => {
                                                const isMine = msg?.sender === user.email;
                                                return (
                                                    <div
                                                        key={msg.id}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: isMine ? "flex-end" : "flex-start",
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                padding: "5px 10px",
                                                                borderRadius: 8,
                                                                backgroundColor: isMine ? "#1890ff" : "#999",
                                                                color: "#fff",
                                                                textAlign: "left",
                                                            }}
                                                        >
                                                            <p style={{fontSize: "12px", fontWeight: "400"}}>
                                                                {isMine ? "Bạn" : name}
                                                            </p>
                                                            <p style={{fontSize: "16px"}}>{msg.content}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    );
                                })
    * */
}