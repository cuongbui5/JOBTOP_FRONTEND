import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {sematicSearch} from "../../api/PublicService.js";
import {List, Typography} from "antd";
import {motion} from "framer-motion";
import JobCard from "./JobCard.jsx";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";

// eslint-disable-next-line react/prop-types
const JobListAI=({query})=>{
    const [jobs, setJobs] = useState([]);
    const {handleRequest}=useApiRequest();

    useEffect(() => {
        async function searchByAI() {
            await handleRequest(()=>sematicSearch(query),(res)=>{
                console.log(res)
                setJobs(res.data);
            },"search_ai")
        }

        if(query===""){
            return;
        }
        searchByAI();

    }, [query]);



    return (

            <LoadingWrapper loadingType={"search_ai"}>
                {jobs && <h1>Công việc liên quan đến {query}</h1>}

                <List
                    style={{marginTop: "20px"}}
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={jobs}
                    renderItem={(job, index) => (
                        <List.Item>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.3, delay: index * 0.2}}

                                style={{
                                    cursor: "pointer",
                                    borderRadius: "12px",
                                    border: "1px solid #ddd",
                                    marginBottom: "8px",
                                    transition: "background-color 0.3s ease", // Hiệu ứng mượt mà
                                }}
                            >
                                <JobCard job={job}/>
                            </motion.div>
                        </List.Item>
                    )}
                />

            </LoadingWrapper>



    )
}

export default JobListAI;