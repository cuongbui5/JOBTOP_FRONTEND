import  { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';

import useApiRequest from "../../hooks/UseHandleApi.js";
import {getAllConversations} from "../../api/ConversationService.js";
import {getStoredUser} from "../../utils/helper.js";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import useMessageStore from "../../store/MessageStore.js";
import {useNavigate} from "react-router-dom";

const { Text } = Typography;

const ConversationPage = () => {
    const {conversations,setConversations,markRead}=useMessageStore(state => state);
    const {handleRequest}=useApiRequest();
    const user=getStoredUser();
    const navigate=useNavigate();


    useEffect(() => {
        const fetchConversations = async () => {
            await handleRequest(()=>getAllConversations(),(res)=>{
                console.log(res);
                setConversations(res.data)
            })

        };
        if(conversations.length===0){
            fetchConversations();
        }


    }, []);
    console.log(conversations)



    return (
        <ResponsiveContainer >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Đoạn chat</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={conversations}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                borderBottom: '1px solid #f0f0f0',
                                padding: '16px 0',
                                cursor: 'pointer'
                            }}
                            onClick={() =>{

                                markRead(item.conversationId)
                                navigate(`/${user.role==="CANDIDATE"?"candidate":"recruiter"}/conversation/${item.conversationId}`)


                            } }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={user.role==="CANDIDATE"? item?.logo:item?.avatar} />}
                                title={
                                    <span style={{ fontWeight: 'bold' }}>{user.role==="CANDIDATE"? item?.companyName:item.email}</span>
                                }
                                description={
                                    item?.content ? (
                                        <div>
                                            <Text style={{ color: '#000', fontWeight: item?.read||item.senderId===Number(user.id) ? 'normal' : 'bold' }}>
                                                {user.id===item.senderId?"Bạn: ":""} {item?.content}
                                            </Text>
                                        </div>
                                    ) : (
                                        <Text type="secondary">No messages yet</Text>
                                    )
                                }
                            />
                        </List.Item>
                    )}
                />

        </ResponsiveContainer>
    );
};

export default ConversationPage;
