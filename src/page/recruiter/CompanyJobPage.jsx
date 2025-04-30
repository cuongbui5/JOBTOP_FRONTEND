import { Button, Modal } from "antd";

import { useEffect, useState } from "react";
import { deleteJob, getAllJobs } from "../../api/JobService.js";
import { useNavigate } from "react-router-dom";
import useHandleApi from "../../hooks/UseHandleApi.js";
import {
    getStoredUser,
    removeById
} from "../../utils/helper.js";
import JobTable from "../../components/web/JobTable.jsx";

const CompanyJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        total: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);


    const navigate = useNavigate();
    const { handleRequest } = useHandleApi();
    const user = getStoredUser();

    const fetchJobs = async (page, size) => {

        await handleRequest(
            () => getAllJobs(page, size, null, user?.id),
            (res) => {
                const data = res.data;
                setJobs(data?.content ?? []);
                setPagination({
                    pageSize: size,
                    total: data.totalElements,
                });
                setCurrentPage(data.currentPage);
            }
        );

    };

    useEffect(() => {
        if (user) {
            fetchJobs(currentPage, pagination.pageSize);
        }
    }, [currentPage]);

    const handleEdit = (job) => {
        navigate(`/job/edit/${job.id}`);
    };

    const handleDelete = async (job) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa công việc này?",
            content: "Hành động này không thể hoàn tác.",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                await handleRequest(() => deleteJob(job.id), () => {
                    const updatedJobs = removeById(jobs, job.id);
                    setJobs(updatedJobs);

                    if (updatedJobs.length === 0 && currentPage > 1) {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }
                });
            },
        });
    };





    return (
        <div style={{ maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff", padding: 20 }}>
            <div style={{ margin: "20px 0", textAlign: "center" }}>
                <h1>Quản lý tin tuyển dụng</h1>
            </div>

            <Button
                type="primary"
                size="large"
                style={{ marginBottom: 16, borderRadius: 0 }}
                onClick={() => navigate("/job/create")}
            >
                Đăng tin tuyển dụng
            </Button>

            <div>
                <p>Số lượt đăng miễn phí còn lại: {getStoredUser().freePost}</p>
            </div>

            <JobTable
                jobs={jobs}
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default CompanyJobPage;
