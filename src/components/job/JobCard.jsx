import {Button, Dropdown, Popover, Tag, Typography} from 'antd';
import {BookOutlined, FlagOutlined, MoreOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {removeFavoriteJobById, saveFavoriteJob} from "../../api/FavoriteJobService.js";
import SalaryText from "./SalaryText.jsx";
import useModalStateStore from "../../store/ModalStateStore.js";
import {getExperienceLabel, getJobTypeLabel, removeById} from "../../utils/helper.js";
import {useState} from "react";
import {evaluateCandidate} from "../../api/AiService.js";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import useJobStore from "../../store/JobStore.jsx";


const {  Paragraph } = Typography;


// eslint-disable-next-line react/prop-types
const JobCard = ({job,savedJob,setSavedJobs}) => {
    const {handleRequest} = useApiRequest();
    const {setSelectedJobId,selectedJobId}=useJobStore(state => state);
    const {setOpenReport} = useModalStateStore(state => state);
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const saveJob = async (id) => {
        await handleRequest(() => saveFavoriteJob(id), (res) => {
            console.log(res)
        }, null, true)
    }

    if (savedJob) {
        job = {...savedJob, id: savedJob?.jobId};
        console.log(job)
    }

    const removeFavoriteJob = async (id) => {
        await handleRequest(() => removeFavoriteJobById(id), (res) => {
            console.log(res)
            setSavedJobs(prev => removeById(prev, id))


        }, null, true);
    }


    const items = [
        {
            key: savedJob ? "remove" : "save",
            label: (<span><BookOutlined
                style={{marginRight: 8}}/>{savedJob ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}</span>),
        },
        {
            key: 'report',
            label: (<span><FlagOutlined style={{marginRight: 8}}/>Báo cáo</span>),
        },
    ];
    const handleClick = async () => {

       await handleRequest(()=>evaluateCandidate(job?.id),(res)=>{
           console.log(res)
           setContent(res.data);
       },"load-evaluate")
    };

    const popoverContent =
        <div
            style={{
                maxWidth: 500,
                maxHeight: 300,
                overflow: "auto",
                whiteSpace: "pre-wrap",

            }}
        >
            <LoadingWrapper loadingType={"load-evaluate"}>
            {content}
            </LoadingWrapper>
        </div>



    return (
        <div onClick={()=>setSelectedJobId(job?.id)}
            style={{
                padding: "8px 18px",
                maxWidth: "100%",
                minHeight: "315px",
                borderRadius: "12px",
                border: selectedJobId===job?.id?"1px solid #999": "1px solid #ddd",
                marginBottom: "8px",
                transition: "background-color 0.3s ease"
        }}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

                <Link to={`/job-detail/${job?.id}`} style={{color: 'black', display: 'inline-block'}}>
                    <h2 style={{margin: "0", fontSize: "26px"}}>{job?.title}</h2>
                </Link>

                <Dropdown
                    menu={{
                        items,
                        onClick: async ({key}) => {
                            console.log(key)
                            if (key === "report") {
                                setOpenReport(true)
                            } else if (key === "save") {
                                await saveJob(job?.id);
                            } else {
                                await removeFavoriteJob(savedJob?.id)

                            }
                        }
                    }} placement="bottomRight">
                    <div style={{}}>
                        <MoreOutlined style={{fontSize: 25}}/>
                    </div>
                </Dropdown>

            </div>



            <p style={{margin: "0", color: '#555', fontWeight: "400", fontSize: "16px"}}>{job?.companyName}</p>
            <p style={{margin: "0", color: '#555', fontWeight: "400", fontSize: "14px"}}>{job?.city}</p>
            <div style={{padding: "5px 0", display: "flex", gap: "8px", flexWrap: "wrap"}}>
                <Tag style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777"
                }}>
                    <SalaryText salaryMin={job?.salaryMin} salaryMax={job?.salaryMax} format={"compact"}/>
                </Tag>
                <Tag style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#777"
                }}>{getJobTypeLabel(job?.jobType).text}</Tag>
                <Tag style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#777"
                }}>{getExperienceLabel(job?.experienceLevel).text}</Tag>
            </div>
            <Paragraph
                style={{marginTop: "8px"}}
                ellipsis={{
                    rows: 5,
                    expandable: false,
                    symbol: "thêm...",
                }}
            >
                <ul style={{color: "#555", fontWeight: "500"}}>
                    {job?.requirements.split("\n").map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            </Paragraph>

            <Popover

                content={popoverContent}
                title="Kết quả đánh giá AI"
                trigger="click"
                placement="topRight"
                open={open}
                onOpenChange={(newOpen) => setOpen(newOpen)}
            >
                <Button onClick={handleClick}>
                    Xem mức độ phù hợp
                </Button>
            </Popover>


        </div>
    );
};

export default JobCard;
