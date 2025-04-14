import { Dropdown, Tag, Typography} from 'antd';
import {BookOutlined, FlagOutlined, MoreOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {removeFavoriteJobById, saveFavoriteJob} from "../../api/FavoriteJobService.js";
import SalaryText from "./SalaryText.jsx";
import useModalStateStore from "../../store/ModalStateStore.js";
import {getExperienceLabel, getJobTypeLabel, removeById} from "../../utils/helper.js";


const {  Paragraph } = Typography;


// eslint-disable-next-line react/prop-types
const JobCard = ({job,savedJob,setSavedJobs}) => {
    const {handleRequest}=useApiRequest();
    const {setOpenReport}=useModalStateStore(state => state);
    const saveJob= async (id)=>{
       await handleRequest(()=>saveFavoriteJob(id),(res)=>{
           console.log(res)
       },null,true)
    }

    if(savedJob){
        job={...savedJob,id:savedJob?.jobId};
        console.log(job)
    }

    const removeFavoriteJob=async (id)=>{
        await handleRequest(()=>removeFavoriteJobById(id),(res)=>{
            console.log(res)
            setSavedJobs(prev=>removeById(prev,id))


        },null,true);
    }



    const items = [
        {
            key: savedJob ? "remove" : "save",
            label: (<span><BookOutlined style={{ marginRight: 8 }} />{savedJob ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}</span>),
        },
        {
            key: 'report',
            label: (<span><FlagOutlined style={{ marginRight: 8 }} />Báo cáo</span>),
        },
    ];

    return (
        <div style={{padding: "8px 18px", width: "100%", minHeight:"315px",position: 'relative'}}>
            <Dropdown menu={{
                items, onClick:async ({key}) => {
                    console.log(key)
                    if(key==="report"){
                        setOpenReport(true)
                    }else if(key==="save") {
                        await saveJob(job?.id);
                    }else {
                        await removeFavoriteJob(savedJob?.id)

                    }
                }
            }} placement="bottomRight">
                <div style={{position: 'absolute', top: 16, right: 10, cursor: 'pointer'}}>
                    <MoreOutlined style={{fontSize: 25}}/>
                </div>
            </Dropdown>
            <Link to={`/job-detail/${job?.id}`} style={{color: 'black',display: 'inline-block'}}>
                <h1 style={{margin: "0", fontSize: "26px"}}>{job?.title}</h1>
            </Link>


            <p style={{margin: "0", color: '#555', fontWeight: "400", fontSize: "16px"}}>{job?.companyName}</p>
            <p style={{margin: "0", color: '#555', fontWeight: "400", fontSize: "14px"}}>{job?.city}</p>
            <div style={{padding: "5px 0",display:"flex",gap:"8px",flexWrap:"wrap"}}>
                <Tag style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777"
                }}>
                    <SalaryText salaryMin={job?.salaryMin} salaryMax={job?.salaryMax}/>
                </Tag>
                <Tag style={{fontSize: "16px", fontWeight: "500", color: "#777"}}>{getJobTypeLabel(job?.jobType).text}</Tag>
                <Tag style={{fontSize: "16px", fontWeight: "500", color: "#777"}}>{getExperienceLabel(job?.experienceLevel).text }</Tag>
            </div>
            <Paragraph
                style={{marginTop:"8px"}}
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





        </div>
    );
};

export default JobCard;
