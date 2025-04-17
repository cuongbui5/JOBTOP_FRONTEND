// MessageNotification.jsx

import { notification} from 'antd';
import useMessageStore from "../../store/MessageStore.js";
import {useEffect} from "react";




// eslint-disable-next-line react/prop-types
const MessageNotification = ({children}) => {
    const { newMessage } = useMessageStore(state => state);
    const [api,contextHolder] = notification.useNotification();

    const openNotification = () => {

        console.log(newMessage)
        if(newMessage&&!newMessage?.read)
        api.open({
            message:"Tin nhắn từ "+ newMessage?.senderName,
            description:newMessage?.content,


        });
    };

    useEffect(() => {

            openNotification();


    }, [newMessage]);



    return (
        <>
            {contextHolder}
            <>
                {children}
            </>



        </>
    );
};

export default MessageNotification;
