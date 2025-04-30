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
    Typography, Pagination,
} from "antd";
import { EducationLevel, ExperienceLevel, Gender, PositionLevel } from "../../utils/helper.js";
import {getAllCities, getAllDesiredPositions} from "../../api/PublicService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {searchCandidates} from "../../api/UserProfileService.js";
import dayjs from "dayjs";

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const mockCandidates = [
    {
        name: "Trần Văn A",
        age: 23,
        position: "Lập trình viên Backend",
        salary: "10 triệu - 10 triệu",
        experience: "1 năm kinh nghiệm",
        location: "TP.HCM",
        updatedAt: "21/04/2024",
        interestCount: 0,
        industry: "CNTT",
        level: "intern",
        education: "dai_hoc",
        gender: "male"
    },
    {
        name: "Hồ Mỹ Hạnh",
        age: 23,
        position: "Nhân Viên Kế Toán",
        salary: "7 triệu - 7 triệu",
        experience: "Chưa có kinh nghiệm",
        location: "TP.HCM",
        updatedAt: "26/05/2023",
        interestCount: 3,
        industry: "Kế toán",
        level: "staff",
        education: "cao_dang",
        gender: "female"
    }
];

const SearchCandidatePage = () => {
    const [candidates,setCandidates] = useState(null);
    const [industries, setIndustries] = useState([]);
    const [cities, setCities] = useState([]);

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
            if (res.status === 200) {
                setIndustries(res.data);
            }
        }, null);
    };

    const fetchCities = async () => {
        await handleRequest(() => getAllCities(), (res) => {
            if (res.status === 200) {
                setCities(res.data);
            }
        }, null);
    };

    useEffect(() => {
        fetchAllPosition();
        fetchCities();
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
    return (
        <div style={{padding: 20}}>
            <h1 style={{marginBottom: "20px"}}>Tìm kiếm ứng viên</h1>

            {/* Thanh tìm kiếm chính */}
            <Row gutter={16} style={{marginBottom: 20}}>
                <Col span={12}>
                    <Search placeholder="Nhập từ khóa" allowClear onSearch={applyFilters}
                            onChange={(e) => handleSearchChange(e.target.value)}/>
                </Col>
                <Col span={6}>
                    <Select
                        placeholder="Chọn Tỉnh/Thành phố"
                        style={{width: "100%"}}
                        allowClear
                        onChange={(value) => handleFilterChange("location", value)}
                    >
                        {cities&&cities.map((city)=>  <Option value={city}>{city}</Option>)}


                    </Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" block onClick={applyFilters}>
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
                            {industries && industries.map((i) => <Option key={i} value={i}>{i}</Option>)}
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

                    {candidates&& candidates.map((candidate) => (
                        <Card key={candidate?.id} style={{marginBottom: 16}}>
                            <Title level={5} style={{marginBottom: 4}}>
                                {candidate?.fullName} ({calculateAge(candidate?.dateOfBirth)} tuổi)
                            </Title>
                            <Text style={{display: "block", fontWeight: 500, marginBottom: 8}}>
                                {candidate.position}
                            </Text>
                            <div style={{marginBottom: 8}}>
                                <Tag color="purple">{candidate?.expectedSalary}</Tag>
                                <Tag color="blue">{candidate?.workExperience}</Tag>
                                <Tag color="geekblue">{candidate?.city}</Tag>
                            </div>
                            <div style={{fontSize: 12, color: "#888"}}>
                                Thời gian cập nhật: {candidate?.updatedAt}
                            </div>
                        </Card>
                    ))}
                    <div style={{width:"100%",display:"flex",justifyContent:"end", marginTop: 24}}>
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

        </div>
    );
};

export default SearchCandidatePage;
