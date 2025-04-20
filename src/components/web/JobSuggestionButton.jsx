import {useEffect, useState} from 'react';
import { Button, Modal, List } from 'antd';
import useApiRequest from "../../hooks/UseHandleApi.js";
import {findJobByResume} from "../../api/AiService.js";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import JobCard from "../job/JobCard.jsx";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";

const JobSuggestionButton = () => {
    const [open, setOpen] = useState(false);
    const [jobs,setJobs]=useState(null);
    const {handleRequest}=useApiRequest();


    useEffect(() => {
        const fetchJobByCv=async ()=>{
            await handleRequest(()=>findJobByResume(),(res)=>{
                console.log(res);
                setJobs(res.data)
            },"load-by-cv")
        }

        if(open){
            fetchJobByCv();

        }


    }, [open]);

    const buttonStyle = {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        backgroundColor: '#52c41a',
        color: '#fff',
        borderRadius: '24px',
        padding: '10px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontWeight: '500',
    };

    return (
        <>
            <Button style={buttonStyle} onClick={() => setOpen(true)}>
                Công việc phù hợp với CV của bạn
            </Button>
            <div style={{ width: "100%" }}>
            <Modal
                title={<h2>Danh sách công việc phù hợp</h2>}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={"100%"}
                style={{
                    top: 40
                }}


            >
                <div style={{maxHeight:"75vh",overflowY:"scroll"}}>
                    <LoadingWrapper loadingType={"load-by-cv"}>
                        {jobs&&
                            <List
                                grid={{
                                    gutter: 20,
                                    xs: 1,
                                    sm: 1,
                                    md: 2,
                                    lg: 2,
                                    xl: 3,
                                }}
                                style={{marginTop: "20px"}}
                                dataSource={jobs}
                                renderItem={(job, index) => (
                                    <List.Item>
                                        <AnimationWrapper index={index}>
                                            <JobCard job={job}/>
                                        </AnimationWrapper>
                                    </List.Item>
                                )}
                            />}


                    </LoadingWrapper>

                </div>


            </Modal>
            </div>
        </>
    );
};

export default JobSuggestionButton;
