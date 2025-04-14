import {RouterProvider} from 'react-router-dom';
import "./global.css";
import router from "./router/router.jsx";
import Loading from "./components/loading/Loading.jsx";
import {useWebStore} from "./store/WebStore.jsx";
import {useEffect} from "react";




function App() {
    const {getDataWebsite}=useWebStore(state => state);
    useEffect(() => {
        getDataWebsite()
    }, [getDataWebsite]);







    return (
        <>
            <Loading/>

            <RouterProvider router={router}  />
        </>

    )

}

export default App;