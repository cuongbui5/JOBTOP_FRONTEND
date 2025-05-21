import {useEffect, useRef, useState} from 'react';
import {Button, Modal, Input, List, Skeleton} from 'antd';
import { SendOutlined, RobotOutlined } from '@ant-design/icons';
import useApiRequest from "../../hooks/UseHandleApi.js";
import {chatWithAi} from "../../api/ChatbotService.js";
import useLoadingStore from "../../store/LoadingStore.js";

const ChatBotModal = () => {
    const [open, setOpen] = useState(false);
    const {handleRequest}=useApiRequest();
    const bottomRef = useRef(null);
    const [messages, setMessages] = useState([
        //{ type: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn về CV?' },
    ]);
    const [input, setInput] = useState('');
    const {loading} = useLoadingStore((state) => state);
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading["chat-with-ai"]]);
    const handleSend =async () => {
        if (!input.trim()) return;
        const message=input;
        setInput('');



        setMessages((prevState)=>[...prevState, { type: 'user', text: message }])
        await handleRequest(()=>chatWithAi(message),(res)=>{
            console.log(res);
            setMessages(
                (prevState)=>[...prevState, { type: 'bot', text: res.data, }]

            );
        },"chat-with-ai")





    };
    const formatInterviewText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1')   // Bỏ **bold**
            .replace(/\*(.*?)\*/g, '$1')       // Bỏ *italic*
            //.replace(/- /g, '\n• ')            // Xuống dòng và thêm bullet nếu cần
            .replace(/\*/g, '')                // Bỏ dấu * dư
            .replace(/\n{2,}/g, '\n')          // Giảm nhiều dòng xuống 1 dòng
            .trim();
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                type="primary"
                shape="round"
                icon={<RobotOutlined />}
                style={{
                    position: 'fixed',
                    bottom: '60px',
                    right: '24px',
                    zIndex: 1000,
                    backgroundColor: '#722ed1',
                    color: '#fff',
                }}
                onClick={() => setOpen(true)}
            >
                JobTop AI
            </Button>

            {/* Modal */}
            <Modal
                title="JobTop AI"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={600}
                styles={{ padding: '16px'  }}
            >
                <div style={{
                    height: "450px",
                    maxHeight: "450px",
                    overflowY: 'auto'
                }}>
                    <List

                        dataSource={messages}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >

                                <div
                                    style={{
                                        backgroundColor: item.type === 'user' ? '#1890ff' : '#f0f0f0',
                                        color: item.type === 'user' ? '#fff' : '#000',
                                        padding: '8px 12px',
                                        borderRadius: '16px',
                                        maxWidth: '100%',
                                        whiteSpace: 'pre-line',
                                        lineHeight: '1.5',

                                    }}
                                >

                                    {formatInterviewText(item.text)}
                                </div>


                            </List.Item>
                        )}
                    />

                    {loading["chat-with-ai"] && (

                            <div
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    color: '#000',
                                    padding: '8px 12px',
                                    borderRadius: '16px',
                                    maxWidth: '70%',
                                }}
                            >
                                <Skeleton active />
                            </div>

                    )}
                    <div ref={bottomRef}/>

                </div>
                {/* Messages List */}


                {/* Input and Send Button */}
                <div style={{marginTop: '16px', display: 'flex', gap: '8px'}}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSend}
                        placeholder="Nhập câu hỏi..."
                    />
                    <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
                </div>
            </Modal>
        </>
    );
};

export default ChatBotModal;
