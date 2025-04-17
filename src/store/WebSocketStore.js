import {create} from "zustand";

import SockJS from "sockjs-client/dist/sockjs"
import Stomp from "stompjs";
import useMessageStore from "./MessageStore.js";
import useNotificationStore from "./NotificationStore.js";
const useWebSocketStore = create((set,get) => ({
    socket: null,
    isConnected: false,
    connect: (userId) => {
        const currentSocket = get().socket;
        // Nếu đã kết nối thì bỏ qua
        if (currentSocket && currentSocket.connected) {
            return;
        }

        const socket = new SockJS("http://localhost:7000/ws");
        const stompClient = Stomp.over(socket);
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

        stompClient.connect(headers, () => {
            set({ isConnected: true, socket: stompClient });

            stompClient.subscribe(`/topic/inbox/${userId}`, (message) => {
                const newMsg = JSON.parse(message.body);
                const { selectedConversationId, addMessage,updateConversations } = useMessageStore.getState();
                console.log("selectedConversationId", selectedConversationId, typeof selectedConversationId);
                console.log("newMsg.conversationId", newMsg.conversationId, typeof newMsg.conversationId);

                if (selectedConversationId && selectedConversationId === newMsg.conversationId) {
                    newMsg.read=true;
                    addMessage(newMsg);
                    updateConversations(newMsg)
                } else {
                    updateConversations(newMsg)

                }

            }, (error) => {
                console.error("❌ WebSocket error", error);
                set({ isConnected: false, socket: null });
            });

            stompClient.subscribe(`/user/queue/notifications`, (message) => {
                const notification = JSON.parse(message.body);
                const { addNotification } = useNotificationStore.getState();
                addNotification(notification)

                console.log("🔔 Notification received", notification);



            });

        });
    },
    disconnect: () => {
        const stompClient = get().socket;
        if (stompClient && stompClient.connected) {
            stompClient.disconnect(() => {
                console.log("🛑 WebSocket disconnected");
                set({ isConnected: false, socket: null });
            });
        } else {
            set({ isConnected: false, socket: null });
        }
    }
}));

export default useWebSocketStore;