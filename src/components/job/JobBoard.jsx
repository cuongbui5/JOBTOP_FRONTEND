import  {useEffect, useState} from "react";
import {Button, Col, Dropdown, Layout, Row, Typography} from "antd";
import {DownOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import JobDetailSection from "./JobDetailSection.jsx";
const { Content, Sider } = Layout;
import {getStoredUser} from "../../utils/helper.js";
import JobList from "./JobList.jsx";
import useJobStore from "../../store/JobStore.jsx";




// eslint-disable-next-line react/prop-types
const JobBoard = ({ jobs }) => {

    const {setFilters,filters,totalElements,selectedJobId}=useJobStore(state => state)
    const sortOptions = [
        { key: "date_desc", label: "Newest" },
        { key: "date_asc", label: "Oldest" },
    ];





    function handleSortChange(key) {
        setFilters({ sortBy: key });
    }

    return (
        <Layout style={{ minHeight: "120vh", backgroundColor: "white" }}>
            <Row gutter={20}>
                {/* 📌 Danh sách việc làm (Chiếm 50% trên desktop, 100% trên mobile) */}
                <Col xs={24} md={11} style={{ background: "#fff", padding: "16px", overflowY: "auto" }}>
                    <div>

                            <Typography.Text>
                                <Link style={{ fontWeight: "bold", color: "#0044cc" }} to={"/user-profile"}>
                                    Hãy đăng tải hồ sơ của bạn
                                </Link> và tìm kiếm công việc tiếp theo trên JobTop!
                            </Typography.Text>

                        <div style={{ height: "1px", backgroundColor: "#999", marginTop: "10px" }}></div>
                        {filters?.keyword && <div style={{ marginTop: 8, color: "#777" }}>Search: {filters?.keyword}</div>}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                            <div>

                                <span>Sort by </span>
                                <Dropdown
                                    menu={{
                                        items: sortOptions,
                                        onClick: ({ key }) => handleSortChange(key),
                                    }}
                                >
                                    <Button iconPosition={"end"} icon={<DownOutlined />}>
                                        {sortOptions.find(option => option.key === filters.sortBy)?.label || "Sort by"}
                                    </Button>
                                </Dropdown>
                            </div>
                            <div style={{ color: "#555" }}>
                                {totalElements}+ jobs <span style={{ cursor: "pointer" }}><QuestionCircleOutlined /></span>
                            </div>
                        </div>
                    </div>
                    <JobList jobs={jobs} />
                </Col>

                {/* 📌 Chi tiết công việc (Ẩn trên mobile, chỉ hiển thị khi có job được chọn) */}
                {selectedJobId && (
                    <Col xs={0} md={13} style={{ background: "white" }}>
                        <Content
                            style={{
                                width: "100%",
                                height: "100vh",
                                paddingBottom: "20px",
                                border: "1px solid #bfbfbf",
                                overflow: "hidden",
                                borderRadius: 8,
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "20px",
                            }}
                        >
                            <JobDetailSection jobId={selectedJobId} />
                        </Content>
                    </Col>
                )}
            </Row>
        </Layout>
    );
};

export default JobBoard;
