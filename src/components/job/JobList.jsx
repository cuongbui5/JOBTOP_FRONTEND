import {List, Pagination} from "antd";
import {motion} from "framer-motion";
import JobCard from "./JobCard.jsx";
import {page_size_view} from "../../utils/constans.js";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import useJobStore from "../../store/JobStore.jsx";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";

// eslint-disable-next-line react/prop-types
const JobList=({jobs})=> {
    const {setSelectedJobId,selectedJobId,currentPage,totalElements,setCurrentPage}=useJobStore(state => state)

    return <LoadingWrapper loadingType={"GET_JOB_VIEW"}>
        <List
            style={{
                marginTop: "10px",
                width: "100%",
                maxHeight: "680px", // Giới hạn chiều cao
                overflowY: "auto",  // Tạo thanh cuộn dọc riêng

            }}
            dataSource={jobs}
            renderItem={(job, index) => (
                <AnimationWrapper index={index}>
                    <div
                        style={{
                            cursor: "pointer",
                            borderRadius: "12px",
                            border: selectedJobId === job.id ? "1px solid #333" : "1px solid #ddd",
                            marginBottom: "8px",
                            transition: "background-color 0.3s ease", // Hiệu ứng mượt mà
                        }}
                        onClick={()=>setSelectedJobId(job?.id)}>
                        <JobCard job={job}/>
                    </div>



                </AnimationWrapper>


            )}
        />

        <div style={{width: "100%", display: "flex", justifyContent: "center", padding: "10px"}}>
            <Pagination simple defaultCurrent={currentPage} total={totalElements} current={currentPage}
                        pageSize={page_size_view}
                        onChange={(page)=>{ setCurrentPage(page)}}/>

        </div>

    </LoadingWrapper>
}

export default JobList;