import useApiRequest from "../../hooks/UseHandleApi.js";
import {useEffect, useState} from "react";
import {getAllJobsView} from "../../api/PublicService.js";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import {Button, List} from "antd";
import JobCard from "./JobCard.jsx";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";

// eslint-disable-next-line react/prop-types
const JobListByCompany=({recruiterId})=>{
    const {handleRequest}=useApiRequest();
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0);
    const [jobs,setJobs]=useState([]);
    const fetchJobsByRecruiter = async (recruiterId,page, isLoadMore = false) => {
        await handleRequest(() => getAllJobsView({companyId:recruiterId}, page, 3), (res) => {
            console.log(res);
            if (isLoadMore) {
                setJobs((prevJobs) => [...prevJobs, ...res.data.content]);
            } else {
                setJobs(res.data.content);
            }

            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        });


    };

    useEffect(() => {

        if(recruiterId) fetchJobsByRecruiter(recruiterId,1);
    }, [recruiterId]);

    return (
        <LoadingWrapper>
            <div style={{width:"100%"}}>
                <List
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={jobs}
                    renderItem={(job,index) => (
                        <List.Item>
                            <AnimationWrapper index={index}>
                                <JobCard job={job}/>
                            </AnimationWrapper>
                        </List.Item>
                    )}
                />

                {currentPage < totalPages && (
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Button
                            size={"large"}
                            onClick={() => fetchJobsByRecruiter(recruiterId,currentPage + 1, true)}

                        >
                            Tải thêm...

                        </Button>
                    </div>
                )}
            </div>



        </LoadingWrapper>

    );
}
export default JobListByCompany;