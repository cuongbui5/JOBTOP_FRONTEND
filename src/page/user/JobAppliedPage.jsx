import { useEffect, useState, useMemo } from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { getAppliedJobsByUser } from "../../api/ApplicationService.js";
import { List, Select } from "antd";
import ApplicationUserCard from "../../components/application/ApplicationUserCard.jsx";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";

const { Option } = Select;

const JobAppliedPage = () => {
    const { handleRequest } = useApiRequest();
    const [applications, setApplications] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            await handleRequest(
                () => getAppliedJobsByUser(),
                (res) => {
                    console.log(res);
                    setApplications(res.data||[]);
                },
                "applied-jobs"
            );
        };

        fetchAppliedJobs();
    }, []);

    // Lọc dữ liệu chỉ khi applications hoặc selectedStatus thay đổi
    const filteredApplications = useMemo(() => {
        return selectedStatus
            ? applications.filter((app) => app.status === selectedStatus)
            : applications;
    }, [selectedStatus, applications]);

    return (
        <div style={{ padding: "40px 20px" }}>
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
                <h1 style={{ marginLeft: "8px" }}>Việc làm đã ứng tuyển</h1>

                <Select
                    style={{ width: 200 }}
                    placeholder="Lọc theo trạng thái"
                    onChange={(value) => setSelectedStatus(value)}
                    allowClear
                >
                    <Option value="Đang chờ xử lý">Đang chờ xử lý</Option>
                    <Option value="Đã xem">Đã xem</Option>
                    <Option value="Được chấp nhận">Được chấp nhận</Option>
                    <Option value="Bị từ chối">Bị từ chối</Option>
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
                    dataSource={filteredApplications} // Sử dụng dữ liệu đã lọc
                    renderItem={(application, index) => (
                        <List.Item>
                            <AnimationWrapper index={index}>
                                <ApplicationUserCard application={application} />
                            </AnimationWrapper>
                        </List.Item>
                    )}
                />
            </LoadingWrapper>
        </div>
    );
};

export default JobAppliedPage;
