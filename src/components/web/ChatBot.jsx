import {useState} from "react";
import {Button, Drawer, List} from "antd";
import TextArea from "antd/es/input/TextArea.js";

export const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const sendMessage = async () => {
        if (!input.trim()) return;

        // Thêm tin nhắn người dùng vào giao diện
        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setInput(""); // Clear input
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:7000/chat?message=${input}&chatId=2`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.body) {
                throw new Error("Server không trả về dữ liệu streaming!");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let botMessage = "";

            // Đọc dữ liệu streaming từng chunk
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                botMessage += chunk; // Tích lũy từng phần của tin nhắn
                setMessages((prev) => {
                    // Cập nhật giao diện theo từng chunk
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];

                    if (lastMessage?.sender === "chatbot") {
                        lastMessage.text = botMessage;
                    } else {
                        updatedMessages.push({ sender: "chatbot", text: botMessage });
                    }

                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "chatbot", text: "Có lỗi xảy ra, vui lòng thử lại sau!" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                shape="circle"
                size="large"
                onClick={()=>setOpen(!open)}
                style={{
                    position: "fixed",
                    bottom: "300px",
                    right: "20px",
                    zIndex: 1000,
                    background:"#001529"
                }}
            >
                💬
            </Button>
            <Drawer
                title="Chat với Job Top AI"
                onClose={()=> setOpen(false)}
                size={'large'}
                open={open}
                bodyStyle={{ display: "flex", flexDirection: "column", padding: 0 }}
            >
                {/* Chat message area */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "16px",
                        background: "#f0f2f5",
                    }}
                >
                    <List
                        dataSource={messages}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    justifyContent: item.sender === "user" ? "flex-end" : "flex-start",
                                    textAlign: item.sender === "user" ? "right" : "left",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "16px",
                                        backgroundColor: item.sender === "user" ? "#1890ff" : "#f5f5f5",
                                        color: item.sender === "user" ? "#fff" : "#000",
                                        maxWidth: "70%",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {item.text}
                                </div>
                            </List.Item>
                        )}
                    />
                    {isLoading && (
                        <div
                            style={{
                                textAlign: "left",
                                marginBottom: "8px",
                            }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    padding: "8px 12px",
                                    borderRadius: "12px",
                                    backgroundColor: "#f1f1f1",
                                    color: "#000",
                                    maxWidth: "70%",
                                    wordWrap: "break-word",
                                }}
                            >
                                Chatbot đang gõ...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div
                    style={{
                        position: "sticky",
                        bottom: 0,
                        padding: "16px",
                        borderTop: "1px solid #f0f0f0",
                        background: "#fff",
                    }}
                >
                    <TextArea
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault(); // Prevent new line on Enter
                                sendMessage();
                            }
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={sendMessage}
                        style={{ marginTop: "8px", width: "100%" }}
                    >
                        Gửi
                    </Button>
                </div>
            </Drawer>
        </>
    );
}
