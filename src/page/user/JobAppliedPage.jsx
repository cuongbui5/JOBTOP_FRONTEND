import { useEffect, useState } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { getAppliedJobsByUser } from "../../api/ApplicationService.js";
import {List, Pagination, Select} from "antd";
import ApplicationUserCard from "../../components/application/ApplicationUserCard.jsx";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";
import {ApplicationStatus} from "../../utils/helper.js";
import RatingModal from "./RatingModal.jsx";

const { Option } = Select;

const JobAppliedPage = () => {
    const { handleRequest } = useApiRequest();
    const [applications, setApplications] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6, total: 0 });
    const [openRating,setOpenRating]=useState(false);
    const [applicationSelected,setApplicationSelected]=useState(null);


    useEffect(() => {
        const fetchAppliedJobs = async (page,size,status) => {
            await handleRequest(
                () => getAppliedJobsByUser(page,size,status),
                (res) => {
                    console.log(res);
                    setApplications(res.data.content||[]);
                    setPagination({
                        current: res.data.currentPage,
                        pageSize: size,
                        total: res.data.totalElements,
                    });
                },
                "applied-jobs"
            );
        };

        fetchAppliedJobs(pagination.current,pagination.pageSize,selectedStatus);
    }, [pagination.current,selectedStatus]);

    const statusOptions = Object.entries(ApplicationStatus).map(([key, { text }]) => (
        <Option key={key} value={key}>
            {text}
        </Option>
    ));

    const closeModal=()=>setOpenRating(false);

    const openModal=()=>setOpenRating(true);


    return (
        <div style={{padding: "40px 20px"}}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                    gap: 20,
                }}
            >
                <h1 style={{marginLeft: "8px"}}>Việc làm đã ứng tuyển</h1>

                <Select
                    style={{width: 200}}
                    placeholder="Lọc theo trạng thái"
                    onChange={(value) => setSelectedStatus(value)}
                    allowClear
                >
                    {statusOptions}
                </Select>
            </div>

            <LoadingWrapper loadingType={"applied-jobs"}>
                <List
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={applications}
                    renderItem={(application, index) => (
                        <List.Item>
                            <AnimationWrapper index={index}>
                                <ApplicationUserCard openRating={openModal} setApplicationSelected={setApplicationSelected} application={application}/>
                            </AnimationWrapper>
                        </List.Item>
                    )}
                />
            </LoadingWrapper>

            <div style={{marginTop: 30, display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={(newPage, newPageSize) => {
                        setPagination((pre)=>({
                            ...pre,
                            current: newPage,
                            pageSize: newPageSize
                        }))
                    }}

                />
                  <RatingModal application={applicationSelected} visible={openRating} onClose={closeModal} />

            </div>
        </div>
    );
};

export default JobAppliedPage;
