import { useEffect, useState, useRef } from "react"
import {Link, useParams} from "react-router-dom"
import { List, Input, Button, Form } from "antd"

import useApiRequest from "../../hooks/UseHandleApi.js"
import { createMessage, getAllMessageByConversationId } from "../../api/MessageService.js"
import { getStoredUser } from "../../utils/helper.js"

import { getConversationById } from "../../api/ConversationService.js"
import useMessageStore from "../../store/MessageStore.js";
import {ArrowLeftOutlined} from "@ant-design/icons";

const ConversationDetail = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const {
        messages,
        setMessages,
        addMessage,
        addMessages,
        setSelectedConversationId,
        updateConversations


    }=useMessageStore(state => state);

    const [conversation, setConversation] = useState(null)
    const { handleRequest } = useApiRequest()
    const messageEndRef = useRef(null)
    const messagesContainerRef = useRef(null)
    const [loadMore, setLoadMore] = useState(false)
    const user = getStoredUser();





    useEffect(() => {
        const fetchConversation = async (id) => {
            await handleRequest(
                () => getConversationById(id),
                (res) => {
                    console.log(res)
                    setConversation(res.data)
                },
            )
        }

        if (id) {
            setSelectedConversationId(id)
            fetchConversation(id)
        }
        return () => {
            setSelectedConversationId(null)
        };
    }, [id])

    useEffect(() => {
        console.log("Scroll")

        if (messageEndRef.current) {
            console.log("Scroll x")
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }, [messages])

    useEffect(() => {
        const fetchConversationDetail = async (conversationId, page, isLoadMore = false) => {
            const container = messagesContainerRef.current
            const prevScrollHeight = isLoadMore && container ? container.scrollHeight : null
            await handleRequest(
                () => getAllMessageByConversationId(conversationId, page),
                (res) => {
                    console.log(res)
                    if (isLoadMore) {
                       addMessages(res.data.content)
                    } else {
                        setMessages(res.data.content)
                    }
                    setCurrentPage(res.data.currentPage)
                    setTotalPages(res.data.totalPages)
                },
            ).then(() => {
                if (isLoadMore && container && prevScrollHeight) {
                    const newScrollHeight = container.scrollHeight
                    container.scrollTop = newScrollHeight - prevScrollHeight
                } else {
                    if (container) {
                        container.scrollTop = container.scrollHeight
                    }
                }
            })
        }

        if (id) {
            fetchConversationDetail(id, currentPage, loadMore)
        }
    }, [id, currentPage])

    async function handleFinish(values) {
        console.log(values)
        if (!values.message.trim()) return
        await handleRequest(
            () => createMessage({conversationId: id, content: values.message.trim() }),
            (res) => {
                console.log(res)
                const msg=res.data;
                msg.read=true;
                addMessage(msg);
                updateConversations(msg)

            },
        )
        form.resetFields()
    }

    const handleScroll = () => {
        const container = messagesContainerRef.current
        if (!container) return

        if (container.scrollTop === 0 && currentPage < totalPages) {
            setLoadMore(true)
            setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    return (
        <div
            style={{
                maxWidth: 700,
                margin: "20px auto",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 10, marginBottom: 10,display:"flex",alignItems:"center",gap:10 }}>
                    <Link to={`/${user.role==="CANDIDATE"?"candidate":"recruiter"}/conversations`}><ArrowLeftOutlined/> </Link> <h3>{user.role === "CANDIDATE" ? conversation?.companyName : conversation?.email}</h3>
                </div>

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden", // Add this to prevent content from overflowing
                        marginBottom: 16,
                    }}
                >
                    <div
                        ref={messagesContainerRef}
                        style={{
                            height: "100%",
                            overflowY: "auto", // This enables vertical scrolling
                            paddingRight: 10,
                        }}
                        onScroll={handleScroll}
                    >
                        <List
                            dataSource={messages}
                            renderItem={(msg) => {
                                const isMine = user.id === msg?.senderId

                                return (
                                    <List.Item
                                        style={{
                                            justifyContent: isMine ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: isMine ? "#1890ff" : "#f0f0f0",
                                                color: isMine ? "#fff" : "#000",
                                                padding: "10px 16px",
                                                borderRadius: 20,
                                                maxWidth: "70%",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {msg.content}
                                        </div>
                                    </List.Item>
                                )
                            }}
                        />
                        <div ref={messageEndRef} />
                    </div>
                </div>

                <Form
                    form={form}
                    onFinish={handleFinish}
                    style={{ width: "100%", display: "flex", gap: 8, alignItems: "center", marginTop: "20px" }}
                >
                    <Form.Item name="message" style={{ width: "100%", marginBottom: 0 }}>
                        <Input placeholder="Nhập tin nhắn..." />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ConversationDetail
