import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {ExportOutlined, EyeOutlined, MessageOutlined, SaveOutlined} from "@ant-design/icons";
import {Button, notification, Tag} from "antd";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import SalaryText from "./SalaryText.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {applyJob} from "../../api/ApplicationService.js";
import {saveFavoriteJob} from "../../api/FavoriteJobService.js";
import {createConversationByUser} from "../../api/ConversationService.js";
import useMessageStore from "../../store/MessageStore.js";
// eslint-disable-next-line react/prop-types
const JobPosting=({job,direction,view})=> {

    const {handleRequest}=useApiRequest();
    const navigate=useNavigate();
    const {setSelectedConversationId}=useMessageStore(state => state)

    const saveJob= async (id)=>{
        await handleRequest(()=> saveFavoriteJob(id),(res)=>{
            console.log(res)
        },null,true)
    }

    const handleApply=async (jobId)=> {
        const resumeId=localStorage.getItem("resumeId");
        console.log({jobId,resumeId})
        if(resumeId===null){
            notification.warning({
                message:"Bạn chưa có cv chính"
            })
            return;
        }

        await handleRequest(()=> applyJob(jobId,resumeId),(res)=>{
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
            <h1 style={{marginBottom: 8}}>{job?.title} ({job?.views} views)</h1>

            <motion.div
                key={direction} // Force re-render để áp dụng flexDirection mới
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.9}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                style={{
                    display: "flex",
                    flexDirection: direction,
                    gap: "5px",
                    marginBottom: "10px",
                    alignItems: direction === "row" ? "center" : "start"
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
                    <p style={{fontWeight: 400, fontSize: "16px"}}>
                        {job?.company?.name} <ExportOutlined/>
                    </p>
                </Link>
                {direction === "row" && <div style={{height: "25px", width: "1px", background: "#bfbfbf"}}></div>}

                <p style={{fontSize: "16px"}}>
                    {job?.city}
                </p>
                {direction === "row" && <div style={{height: "25px", width: "1px", background: "#bfbfbf"}}></div>}



                <SalaryText salaryMin={job?.salaryMin} salaryMax={job?.salaryMax}/>
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
                        fontSize: "large",
                        color: "#fff",
                        fontWeight: "500"
                    }}
                >

                    Ứng tuyển ngay <ExportOutlined/>
                </Button>


                <Button size={"large"} style={{
                    height: "45px",
                    fontSize: "large",
                    fontWeight: "500"
                }}
                        onClick={async () => {
                            await handleRequest(() => createConversationByUser({companyName:job?.company?.name}), (res) => {
                                console.log(res)
                                setSelectedConversationId(res.data.id)

                                navigate("/conversations")

                            })
                        }}
                >
                    <MessageOutlined style={{color: '#333', fontSize: "30px"}}/> Nhắn tin
                </Button>

                <Button size={"large"} style={{
                    height: "45px",
                    fontSize: "large",
                    fontWeight: "500"
                }} onClick={() => saveJob(job?.id)}>
                    <SaveOutlined style={{color: '#333', fontSize: "30px"}}/>
                </Button>
            </div>
        </div>
    </LoadingWrapper>
}

export default JobPosting;