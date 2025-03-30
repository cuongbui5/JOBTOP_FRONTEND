import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {useEffect, useState} from "react";
import {getAllFavoriteJobsByUser} from "../../api/FavoriteJobService.js";
import {List} from "antd";
import JobCard from "../../components/job/JobCard.jsx";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";
import useJobStore from "../../store/JobStore.jsx";

const JobSavedPage=()=>{

    const {handleRequest}=useApiRequest();
    const [savedJobs,setSavedJobs]=useState([]);
    const {setSelectedJobId}=useJobStore(state => state);





    useEffect(()=>{
        const fetchSavedJobs= async ()=>{
            await handleRequest(()=>getAllFavoriteJobsByUser(),(res)=>{
                console.log(res)
                setSavedJobs(res.data)
            },"saved-jobs")
        }

        fetchSavedJobs();


    },[])
    return (
        <div style={{
            padding: "40px 20px"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "30px",
                flexWrap: "wrap",
                gap: 20

            }}>
                <h1 style={{marginLeft: "8px"}}>Việc làm đã lưu</h1>



            </div>
            <LoadingWrapper loadingType={"saved-jobs"}>
                <List

                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={savedJobs}
                    renderItem={(savedJob,index) => (

                        <List.Item>
                            <AnimationWrapper index={index}>
                                <div
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "12px",
                                        border:  "1px solid #ddd",
                                        marginBottom: "8px",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onClick={()=>setSelectedJobId(savedJob.jobId)}
                                    >
                                    <JobCard savedJob={savedJob} setSavedJobs={setSavedJobs}/>
                                </div>
                            </AnimationWrapper>


                        </List.Item>
                        )}
                    />


            </LoadingWrapper>


        </div>
)
}

export default JobSavedPage;