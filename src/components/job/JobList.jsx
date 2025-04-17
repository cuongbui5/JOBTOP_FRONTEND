import {List, Pagination} from "antd";

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
                <List.Item>
                    <AnimationWrapper index={index}>
                        <JobCard job={job}/>
                    </AnimationWrapper>
                </List.Item>



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