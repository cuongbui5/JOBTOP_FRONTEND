import { createRoot } from 'react-dom/client'
import MyApp from './App.jsx'
import {ConfigProvider,App } from "antd";


createRoot(document.getElementById('root')).render(
    <ConfigProvider
        theme={{
            components: {
                Menu: {
                    darkItemSelectedBg:"transparent",


                },
            },
        }}
    >
        <App>
            <MyApp />
        </App>

    </ConfigProvider>

)
