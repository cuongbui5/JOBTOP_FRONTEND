import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Input,
    Select,
    Button,
    Card,
    Tag,
    Divider,
    Typography, Pagination, Dropdown, Menu, Checkbox, Form, Modal,
} from "antd";
import {
    EducationLevel,
    ExperienceLevel,
    Gender, getEducationLabel,
    getExperienceLabel,
    getGenderLabel, getPositionLevelLabel,
    PositionLevel
} from "../../utils/helper.js";
import { getAllDesiredPositions} from "../../api/PublicService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {searchCandidates} from "../../api/UserProfileService.js";
import dayjs from "dayjs";
import CitySelect from "../../components/web/CitySelect.jsx";
import { NotificationOutlined} from "@ant-design/icons";
import {getAllJobsTitle} from "../../api/JobService.js";
import {sendJobsEmail} from "../../api/EmailService.js";

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;


const SearchCandidatePage = () => {
    const [candidates,setCandidates] = useState(null);
    const [candidateSelected,setCandidateSelected] = useState(null);

    const [industries, setIndustries] = useState([]);
    const [jobs,setJobs]=useState(null);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [filters, setFilters] = useState({
        keyword: "",
        location: null,
        industry: null,
        experience: null,
        level: null,
        education: null,
        gender: null
    });

    const { handleRequest } = useApiRequest();

    useEffect(() => {
        const fetchCandidates = async () => {
            await handleRequest(() =>
                    searchCandidates({
                        keyword: filters.keyword,
                        city: filters.location,
                        industry: filters.industry,
                        experienceLevel: filters.experience,
                        positionLevel: filters.level,
                        educationLevel: filters.education,
                        gender: filters.gender,
                        page: pagination.current,
                        size: pagination.pageSize
                    }),
                (res) => {
                    console.log(res);
                    setCandidates(res.data.content); // Dữ liệu ứng viên
                    setPagination({
                        ...pagination,
                        current: res.data.currentPage,
                        total: res.data.totalElements,
                    });
                }
            );
        };

        fetchCandidates();
    }, [filters, pagination.current]);



    const fetchAllPosition = async () => {
        await handleRequest(() => getAllDesiredPositions(), (res) => {
            setIndustries(res.data);
        }, null);
    };

    useEffect(() => {
        const fetchJobTitle=async ()=>{
            await handleRequest(()=>getAllJobsTitle(),(res)=>{
                console.log(res);
                setJobs(res.data)



            })
        }
        fetchJobTitle();
    }, []);



    useEffect(() => {
        fetchAllPosition();

    }, []);

    const handleSearchChange = (value) => {
        setFilters((prev) => ({ ...prev, keyword: value }));
    };

    const handleFilterChange = (field, value) => {
        setPagination((prev) => ({
            ...prev,
            current: 1
        }));
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const applyFilters = () => {
        setPagination((prev) => ({
            ...prev,
            current: 1
        }));
    };

    const handlePageChange = (page) => {
        setPagination((p) => ({ ...p, current: page }));
        window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu danh sách
    };
    const calculateAge = (dob) => {
        return dayjs().diff(dayjs(dob), 'year');
    };
    const handleJobSelection = (checkedValues) => {
        setSelectedJobs(checkedValues);
    };
    const showJobModal = (id) => {
        setCandidateSelected(id)
        setIsModalVisible(true);

    };



    const handleSendEmail =async () => {
        console.log(selectedJobs)
        console.log(candidateSelected)
        const data={jobIds:selectedJobs,candidateId:Number(candidateSelected) };
        console.log(data)

        await handleRequest(()=>sendJobsEmail(data),(res)=>{
            console.log(res)
        },null,true)

        setIsModalVisible(false);
    };




    return (
        <div style={{padding: 20}}>
            <h1 style={{marginBottom: "20px"}}>Tìm kiếm ứng viên</h1>

            {/* Thanh tìm kiếm chính */}
            <Row gutter={16} style={{marginBottom: 20}}>
                <Col span={12}>
                    <Search
                        size={"large"} placeholder="Nhập từ khóa" allowClear onSearch={applyFilters}
                            onChange={(e) => handleSearchChange(e.target.value)}/>
                </Col>
                <Col span={6}>
                    <Form>
                        <CitySelect   onChange={(value) => handleFilterChange("location", value)} labelHidden={true} />
                    </Form>

                </Col>
                <Col span={6}>
                    <Button size={"large"} type="primary" block onClick={applyFilters}>
                        TÌM KIẾM
                    </Button>
                </Col>
            </Row>

            {/* Bộ lọc */}
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <Select
                            placeholder="Ngành nghề"
                            style={{width: "100%"}}
                            allowClear
                            onChange={(value) => handleFilterChange("industry", value)}
                        >
                            {industries?.length>0 && industries.map((i) => <Option key={i} value={i}>{i}</Option>)}
                        </Select>

                        <Select placeholder="Kinh nghiệm" style={{width: "100%"}} allowClear
                                onChange={(value) => handleFilterChange("experience", value)}>
                            {Object.entries(ExperienceLevel).map(([key, {text}]) => (
                                <Option key={key} value={key}>{text}</Option>
                            ))}
                        </Select>
                        <Select placeholder="Cấp bậc" style={{width: "100%"}} allowClear
                                onChange={(value) => handleFilterChange("level", value)}>
                            {Object.entries(PositionLevel).map(([key, {text}]) => (
                                <Option key={key} value={key}>{text}</Option>
                            ))}
                        </Select>
                        <Select placeholder="Học vấn" style={{width: "100%"}} allowClear
                                onChange={(value) => handleFilterChange("education", value)}>
                            {Object.entries(EducationLevel).map(([key, {text}]) => (
                                <Option key={key} value={key}>{text}</Option>
                            ))}
                        </Select>
                        <Select placeholder="Giới tính" style={{width: "100%"}} allowClear
                                onChange={(value) => handleFilterChange("gender", value)}>
                            {Object.entries(Gender).map(([key, {text}]) => (
                                <Option key={key} value={key}>{text}</Option>
                            ))}
                        </Select>

                        <Button onClick={applyFilters}>Lọc ứng viên</Button>
                    </div>
                </Col>

                {/* Danh sách ứng viên */}
                <Col span={18}>
                    <Text>
                        Kết quả tìm thấy: <b>{candidates?.length}</b> hồ sơ
                    </Text>
                    <Divider/>

                    {candidates?.length>0&& candidates.map((candidate) => (
                        <Card key={candidate?.id} style={{marginBottom: 16}}>
                            <Title level={5} style={{marginBottom: 4}}>
                                {candidate?.fullName} ({calculateAge(candidate?.dateOfBirth)} tuổi)
                            </Title>
                            <Text style={{display: "block", fontWeight: 500, marginBottom: 8}}>
                                {candidate.position}
                            </Text>
                            <div style={{marginBottom: 8}}>
                                {candidate?.expectedSalary && <Tag color="purple">{candidate?.expectedSalary}</Tag>}
                                {candidate?.workExperience &&
                                    <Tag color="blue">{getExperienceLabel(candidate?.workExperience).text}</Tag>}
                                {candidate?.city && <Tag color="geekblue">{candidate?.city}</Tag>}
                                {candidate?.desiredPosition && <Tag color="geekblue">{candidate?.desiredPosition}</Tag>}
                                {candidate?.gender && <Tag color="geekblue">{getGenderLabel(candidate?.gender).text}</Tag>}
                                {candidate?.education && <Tag color="geekblue">{getEducationLabel(candidate?.education).text}</Tag>}
                                {candidate?.positionLevel && <Tag color="geekblue">{getPositionLevelLabel(candidate?.positionLevel).text}</Tag>}

                            </div>
                            <div>
                                {candidate.description}
                            </div>
                            <div style={{fontSize: 12, color: "#888"}}>
                                Thời gian cập nhật: {dayjs(candidate?.updatedAt).format("DD/MM/YYYY HH:mm")}
                            </div>



                                <Button onClick={()=>showJobModal(candidate?.id)} icon={<NotificationOutlined />}>
                                    Gửi thông báo việc làm qua email
                                </Button>










                        </Card>
                    ))}
                    <div style={{width: "100%", display: "flex", justifyContent: "end", marginTop: 24}}>
                    <Pagination
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </Col>
            </Row>

            {/* Modal chọn job */}
            <Modal
                title="Chọn các công việc"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSendEmail}>
                        Gửi email
                    </Button>,
                ]}
                width={900}
            >
                <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={handleJobSelection}
                    value={selectedJobs}
                >
                    <Row gutter={[16, 16]}>
                        {jobs?.map((job) => (
                            <Col span={8} key={job.id}>
                                <Checkbox value={job.id}>{job.title}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Modal>

        </div>
    );
};

export default SearchCandidatePage;
