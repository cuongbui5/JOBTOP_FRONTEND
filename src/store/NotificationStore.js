import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],
    hasNotification:false,
    setNotifications:(data)=>set(()=>(
        {
            notifications:data,
            hasNotification:false,
        }
    )),
    addNotification: (notification) =>{
        set((state) => ({
            notifications: [notification, ...state.notifications],
            hasNotification:true
        }))
    },
    clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
