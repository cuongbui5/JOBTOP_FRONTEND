import {RouterProvider} from 'react-router-dom';
import "./global.css";
import router from "./router/router.jsx";
import Loading from "./components/loading/Loading.jsx";
import {useEffect} from "react";
import {useWebStore} from "./store/WebStore.jsx";
/*import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();
*/


function App() {
    const {getDataWebsite}=useWebStore(state => state)
    useEffect(() => {
        getDataWebsite()
    }, []);

    return (
        <>
            <Loading/>

            <RouterProvider router={router}  />
        </>

    )

}

export default App;