import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {ExportOutlined,  MessageOutlined} from "@ant-design/icons";
import {Button, Typography} from "antd";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import SalaryText from "./SalaryText.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {applyJob} from "../../api/ApplicationService.js";

import {createConversationByUser} from "../../api/ConversationService.js";
import useMessageStore from "../../store/MessageStore.js";
import {useMediaQuery} from "react-responsive";
const {Text}=Typography;
const JobPosting=({job,direction,view})=> {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const {handleRequest}=useApiRequest();
    const navigate=useNavigate();
    const {setSelectedConversationId,conversations,addConversation}=useMessageStore(state => state)

    console.log(isMobile)

    const handleApply=async (jobId)=> {

        await handleRequest(()=> applyJob(jobId),(res)=>{
            console.log(res)
        },null,true)
    }

    return <LoadingWrapper loadingType={"GET_JOB_DETAIL"}>
        <div style={{
            width: "100%",
            paddingBottom: 8,
            borderBottom: "1px solid #ddd",
            backgroundColor: "white",
            paddingLeft: "20px",
            paddingTop: "20px"
        }}>

            <h1>{job?.title}</h1>




            <motion.div
                key={direction} // Force re-render để áp dụng flexDirection mới
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.9}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                style={{
                    display: "flex",
                    flexDirection:isMobile?"column": direction,
                    gap: "5px",
                    marginBottom: "10px",
                    alignItems: direction === "row"&&!isMobile ? "center" : "start"
                }}
            >
                <Link
                    to={`/company/${job?.company?.id}`}
                    style={{
                        width: "max-content",
                        borderBottom: "1px solid black",
                        paddingBottom: "2px",
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#333"
                    }}
                >
                    <p style={{fontWeight: 400, fontSize: "14px"}}>
                        {job?.company?.name} <ExportOutlined/>
                    </p>
                </Link>
                {direction === "row"&&!isMobile && <div style={{height: "25px", width: "1px", background: "#bfbfbf"}}></div>}
                <Text style={{fontSize: 14}}>
                    {job?.city} • {job?.views} lượt xem
                </Text>

                {direction === "row"&&!isMobile && <div style={{height: "25px", width: "1px", background: "#bfbfbf"}}></div>}

                <SalaryText salaryMin={job?.salaryMin} salaryMax={job?.salaryMax} format={"compact"}/>


            </motion.div>


            <div style={{display: view ? 'none' : 'flex', gap: '10px'}}>

                <Button
                    disabled={job?.applicationDeadline
                        ? new Date(job?.applicationDeadline) < new Date()
                        : false}
                    size={"large"}
                    onClick={() => handleApply(job?.id)}
                    style={{
                        backgroundColor: '#2058B4',
                        height: "45px",
                        fontSize: "medium",
                        color: "#fff",
                        fontWeight: "500"
                    }}
                >

                    Ứng tuyển ngay <ExportOutlined/>
                </Button>


                <Button size={"large"} style={{
                    height: "45px",
                    fontSize: "medium",
                }}
                        onClick={async () => {
                            await handleRequest(() => createConversationByUser({companyName: job?.company?.name}), (res) => {
                                console.log(res)

                                navigate("candidate/conversation/"+res.data.conversationId)

                            })
                        }}
                >
                    <MessageOutlined style={{color: '#333', fontSize: "medium"}}/> Nhắn tin
                </Button>




            </div>
        </div>
    </LoadingWrapper>
}

export default JobPosting;