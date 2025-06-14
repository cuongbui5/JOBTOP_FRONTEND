import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import {
    CalendarOutlined,
    CarryOutOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined, FlagOutlined, HeartOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import {Button, Tag, Typography} from "antd";
import dayjs from "dayjs";
import {useRef} from "react";
import useModalStateStore from "../../store/ModalStateStore.js";
import SalaryText from "./SalaryText.jsx";
import {getExperienceLabel, getJobTypeLabel} from "../../utils/helper.js";
import {saveFavoriteJob} from "../../api/FavoriteJobService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
const { Title, Text } = Typography;

// eslint-disable-next-line react/prop-types
const JobDetailScroll=({setDirection,job,view})=> {
    const {handleRequest}=useApiRequest();
    const scrollContainerRef = useRef(null);
    const {setOpenReport}=useModalStateStore(state => state)
    const lastScrollY = useRef(0);

    const saveJob= async (id)=>{
        await handleRequest(()=> saveFavoriteJob(id),(res)=>{
            console.log(res)
        },null,true)
    }

    const handleScroll = () => {
        const currentScrollY = scrollContainerRef.current.scrollTop;

        if (currentScrollY > lastScrollY.current) {
            // Cuộn xuống
            setDirection("row");
        } else {
            // Cuộn lên
            setDirection("column");
        }

        lastScrollY.current = currentScrollY;

    };

    return <div ref={scrollContainerRef} onScroll={handleScroll} style={{overflowY: "auto", maxHeight: 700, paddingLeft: "20px"}}>
        <LoadingWrapper loadingType={"GET_JOB_DETAIL"}>
            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Mô tả công việc</Title>
                {job?.description.includes("\n") ? (
                    // Nếu có xuống dòng, tách từng dòng và hiển thị riêng
                    job?.description.split("\n").map((line, index) => (
                        <Text key={index} style={{fontSize: "large", display: "block"}}>
                            {line}
                        </Text>
                    ))
                ) : (
                    // Nếu không có xuống dòng, hiển thị nguyên đoạn văn
                    <Text style={{fontSize: "large", display: "block"}}>
                        {job?.description}
                    </Text>
                )}

            </div>


            <div style={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Chi tiết công việc</Title>
                <div style={{display: "flex", alignItems: "start", gap: "10px"}}>
                    <div>
                        <DollarOutlined style={{fontSize: 16}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <Text strong>Mức lương</Text>
                        <Tag color="default" style={{
                            width: "max-content",
                            background: "#ECECEC",
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#555",
                            padding: "4px 8px",
                            display: "inline-flex"
                        }}>
                            <SalaryText salaryMin={job?.salaryMin} salaryMax={job?.salaryMax} format={"compact"}/>
                        </Tag>
                    </div>


                </div>
                <div style={{display: "flex", alignItems: "start", gap: "10px"}}>
                    <div>
                        <SolutionOutlined style={{fontSize: 16}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <Text strong>Yêu cầu kinh nghiệm</Text>
                        <Tag color="default" style={{
                            width: "max-content",
                            background: "#ECECEC",
                            fontSize: 16,
                            fontWeight: "500",
                            color: "#555",
                            padding: "4px 8px",
                            display: "inline-flex"
                        }}>
                            {  getExperienceLabel(job?.experienceLevel).text }
                        </Tag>
                    </div>


                </div>
                <div style={{display: "flex", alignItems: "start", gap: "10px",}}>
                    <div>
                        <CarryOutOutlined style={{fontSize: 16}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <Text strong>Hình thức làm việc</Text>

                        <Tag color="default" style={{
                            width: "max-content",
                            background: "#ECECEC",
                            fontSize: 16,
                            fontWeight: "500",
                            color: "#555",
                            padding: "4px 8px",
                            display: "inline-flex"
                        }}>
                            {getJobTypeLabel(job?.jobType).text }
                        </Tag>
                    </div>


                </div>



            </div>


            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Địa điểm</Title>
                <Text style={{fontSize: "large"}}>
                    <EnvironmentOutlined style={{fontSize: "16px"}}/> {job?.location}
                </Text>

            </div>

            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Thời gian làm việc</Title>
                <Text style={{fontSize: "large"}}><FieldTimeOutlined
                    style={{fontSize: "16px"}}/> {job?.workSchedule}
                </Text>

            </div>

            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Hạn ứng tuyển</Title>
                <Text style={{fontSize: "large"}}><CalendarOutlined
                    style={{fontSize: "16px"}}/> {dayjs(job?.applicationDeadline).format("DD/MM/YYYY")}</Text>

            </div>

            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Quyền lợi</Title>
                {job?.benefits.includes("\n") ? (
                    // Nếu có xuống dòng, tách từng dòng và hiển thị riêng
                    job?.benefits.split("\n").map((line, index) => (
                        <Text key={index} style={{fontSize: "large", display: "block"}}>
                            - {line}
                        </Text>
                    ))
                ) : (
                    // Nếu không có xuống dòng, hiển thị nguyên đoạn văn
                    <Text style={{fontSize: "large", display: "block"}}>
                        {job?.benefits}
                    </Text>
                )}

            </div>
            <div style={{
                maxWidth: "100%",
                borderBottom: "1px solid #ECECEC",
                paddingBottom: "20px"
            }}>
                <Title level={4}>Yêu cầu</Title>
                {job?.requirements.includes("\n") ? (
                    // Nếu có xuống dòng, tách từng dòng và hiển thị riêng
                    job?.requirements.split("\n").map((line, index) => (
                        <Text key={index} style={{fontSize: "large", display: "block"}}>
                            - {line}
                        </Text>
                    ))
                ) : (
                    // Nếu không có xuống dòng, hiển thị nguyên đoạn văn
                    <Text style={{fontSize: "large", display: "block"}}>
                        {job?.requirements}
                    </Text>
                )}

            </div>

            {view? null:
                <div style={{display:"flex",gap:20,alignItems:"center"}}>
                    <Button
                        icon={<FlagOutlined/>}
                        style={{
                            backgroundColor: "#F1F1EF",
                            color: "#262626",
                            fontWeight: "bold",
                            border: "none",
                            height: "50px",
                            fontSize: "16px",
                            marginTop: "20px"

                        }}
                        onClick={()=>setOpenReport(true)}
                    >
                        Báo cáo
                    </Button>

                    <Button
                        icon={<HeartOutlined/>}
                        style={{
                            backgroundColor: "#F1F1EF",
                            color: "#262626",
                            fontWeight: "bold",
                            border: "none",
                            height: "50px",
                            fontSize: "16px",
                            marginTop: "20px"

                        }}
                        onClick={() => saveJob(job?.id)}
                    >
                        Thêm vào yêu thích

                    </Button>

                </div>
             }

        </LoadingWrapper>
    </div>
}

export default JobDetailScroll;