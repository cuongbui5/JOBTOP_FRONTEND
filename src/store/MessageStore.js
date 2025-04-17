// store/messageStore.js
import { create } from 'zustand'


const useMessageStore = create((set,get) => ({
    selectedConversationId:null,
    newMessage:null,
    setNewMessage:(message)=>set({newMessage:message}),
    setSelectedConversationId:(id)=>set({selectedConversationId:Number(id)}),
    messages:[],
    setMessages:(messages)=>set({messages}),
    addMessage:(newMessage)=>set({
        messages:[...get().messages,newMessage]
    }),
    addMessages:(newMessages)=>set({
        messages:[...newMessages,...get().messages]
    }),
    conversations:[],
    setConversations:(conversations)=>set({conversations}),
    addConversation:(conversation)=>{
        set({
            conversations:[...get().conversations,conversation]
        })
    },

    markRead:(id)=>{
        const updatedConversations = get().conversations.map(c => {
            if (c.conversationId === id) {
                return {
                    ...c,
                    read:true,
                };
            }
            return c;
        });
        set({ conversations: updatedConversations });
    },


    updateConversations:(newMessage)=>{
        console.log(newMessage)
        const updatedConversations = get().conversations.map(c => {
            if (c.conversationId === newMessage.conversationId) {
                return {
                    ...c,
                    senderId:newMessage.senderId,
                    content: newMessage.content,
                    read:newMessage.read,
                };
            }
            return c;
        });
        get().setNewMessage(newMessage)

        set({ conversations: updatedConversations });

    },



}))

export default useMessageStore;
