import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getJob, saveJob} from "../../api/JobService.js";
import dayjs from "dayjs";
import {Button, Col, DatePicker, Form, Input, message, Row, Select} from "antd";
import ExpandableInput from "../../components/job/ExpandableInput.jsx";
import {useWebStore} from "../../store/WebStore.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";

const jobEx = {
    title: "Software Engineer",
    location: "Hà Nội",
    requirements: "Tốt nghiệp chuyên ngành Công nghệ thông tin, Khoa học máy tính hoặc ngành liên quan.\n" +
        "Thành thạo ít nhất một trong các ngôn ngữ lập trình: Java, Python, JavaScript, TypeScript, C#,...\n" +
        "Có kinh nghiệm làm việc với React.js, Angular, Vue.js (đối với frontend) hoặc Spring Boot, Node.js, Django (đối với backend) là lợi thế.\n" +
        "Kiến thức tốt về cơ sở dữ liệu SQL/NOSQL (MySQL, PostgreSQL, MongoDB, Redis).\n" +
        "Kinh nghiệm làm việc với các hệ thống RESTful API, GraphQL.\n" +
        "Hiểu biết về CI/CD, Docker, Kubernetes là một điểm cộng.\n" +
        "Kỹ năng làm việc nhóm, tư duy logic và giải quyết vấn đề tốt.\n" +
        "Đọc hiểu tài liệu tiếng Anh, giao tiếp cơ bản là một lợi thế.",
    salaryMax: 2000,
    salaryMin:500,
    benefits: "Lương cạnh tranh, thưởng theo hiệu suất.\n" +
        "Môi trường làm việc hiện đại, năng động, cơ hội thăng tiến rõ ràng.\n" +
        "Được đào tạo và tiếp cận công nghệ mới.\n" +
        "Bảo hiểm sức khỏe, du lịch hàng năm, team-building cùng công ty.\n" +
        "Linh hoạt thời gian làm việc, hỗ trợ remote/hybrid nếu cần.",
    applicationDeadline: dayjs("2025-03-31"),
    workSchedule: "Thứ 2 - Thứ 6, 9:00 - 18:00",
    description: "Chúng tôi đang tìm kiếm một Software Engineer tài năng và nhiệt huyết để tham gia vào đội ngũ phát triển sản phẩm của công ty. Bạn sẽ làm việc trong một môi trường năng động, sáng tạo và sử dụng các công nghệ tiên tiến để xây dựng các hệ thống phần mềm chất lượng cao.\n" +
        "\n" +
        "Trách nhiệm chính\n" +
        "Thiết kế, phát triển và triển khai các ứng dụng web hoặc phần mềm theo yêu cầu.\n" +
        "Tối ưu hiệu suất, bảo mật và khả năng mở rộng của hệ thống.\n" +
        "Phối hợp với các nhóm sản phẩm, thiết kế và QA để đảm bảo chất lượng sản phẩm.\n" +
        "Nghiên cứu và áp dụng các công nghệ mới nhằm cải thiện quy trình phát triển.\n" +
        "Viết tài liệu kỹ thuật và hướng dẫn sử dụng cho hệ thống.\n" +
        "Kiểm thử, gỡ lỗi và duy trì hệ thống sau khi triển khai.",

};

const { Option } = Select;

const JobForm=()=> {
    const [form] = Form.useForm();
    const {tags,industries,fetchIndustries,fetchTags}=useWebStore(state => state)
    const { id } = useParams();
    const {handleRequest}=useApiRequest()
    const isEditing = Boolean(id);
    const [job, setJob] = useState(null);

    // Nếu là chỉnh sửa, tải dữ liệu job
    useEffect(() => {
        if (isEditing){
            const fetchJob=async (id)=>{
                await handleRequest(()=>getJob(id),(res)=>{
                    console.log(res)
                    setJob(res.data)

                    const data = {
                        ...res.data,
                        industry: res.data.industry?.id, // Đảm bảo job.industry không bị undefined
                        tags: res.data.tags?.map(tag => tag.id.toString()) || [], // Chuyển đổi tags thành mảng ID dạng string
                        applicationDeadline: res.data.applicationDeadline ? dayjs(res.data.applicationDeadline) : null, // Chuyển đổi ngày deadline
                    };
                    form.setFieldsValue(data)
                })
            }

            fetchJob(id);

        }else {
            //form.resetFields()
            form.setFieldsValue(jobEx)
        }

        if(!tags){
            fetchTags();
        }

        if(!industries){
            fetchIndustries();
        }


        //form.setFieldsValue(job);
    }, [id]);

    const handlerValues=(values)=>{
        if(values.tags){
            values.tags=tags.filter(tag => values.tags.includes(tag.id.toString()));
        }
        if(values.industry){
            values.industry=industries.find(i => i.id === values.industry)
        }

        if(values.applicationDeadline){
            values.applicationDeadline= dayjs(values.applicationDeadline).utcOffset(0, true).toISOString();

        }

        return values;
    }

    const handleFinish =async (values) => {
        const jobData=handlerValues(values);

        console.log(jobData)
        if(job){
            jobData.id=job.id;
            jobData.status=job.status;
        }

        await handleRequest(()=>saveJob(jobData),(res)=>{
            console.log(res)
            if(res.status===200){
                message.success(res.message)

            }
        })
    };

    // Xử lý form submit

    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>


            <Form form={form} layout="vertical" onFinish={handleFinish}
                  style={{padding: 40}}
                //initialValues={jobEx}
                //initialValues={job?jobEx:job}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Tiêu đề công việc" name="title"
                                   rules={[{required: true, message: "Vui lòng nhập tiêu đề!"}]}>
                            <Input placeholder="Nhập tiêu đề công việc"/>
                        </Form.Item>
                        <Form.Item label="Địa điểm" name="location"
                                   rules={[{required: true, message: "Vui lòng nhập dia diem!"}]}>
                            <Input placeholder="Nhập địa điểm"/>
                        </Form.Item>
                        <Form.Item label="Thành phố" name="city"
                                   rules={[{required: true, message: "Vui lòng nhập dia diem!"}]}>
                            <Input placeholder="Nhập thành phố"/>
                        </Form.Item>
                        <Form.Item label="Loại công việc" name="jobType"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Select placeholder="Chọn loại công việc">
                                <Option value="ALL">Tất cả</Option>
                                <Option value="FULL_TIME">Toàn thời gian</Option>
                                <Option value="PART_TIME">Bán thời gian</Option>
                                <Option value="INTERNSHIP">Thực tập</Option>
                                <Option value="OTHER">Khác</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Quyền lợi" name="benefits"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Input.TextArea placeholder="Nhập quyền lợi" rows={7}/>
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Kinh nghiệm" name="experienceLevel"
                                   rules={[{required: true, message: "Vui lòng chon!"}]}>
                            <Select placeholder="Chọn kinh nghiệm">
                                <Option value="NO_REQUIREMENT">Không yêu cầu</Option>
                                <Option value="LESS_THAN_ONE_YEAR">Dưới 1 năm</Option>
                                <Option value="ONE_YEAR">1 năm</Option>
                                <Option value="TWO_YEARS">2 năm</Option>
                                <Option value="THREE_YEARS">3 năm</Option>
                                <Option value="FOUR_YEARS">4 năm</Option>
                                <Option value="FIVE_YEARS">5 năm</Option>
                                <Option value="MORE_THAN_FIVE_YEARS">Trên 5 năm</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Lương tối thiểu (VND)"
                            name="salaryMin"
                            rules={[
                                { required: true, message: "Vui lòng nhập lương tối thiểu!" },
                                {
                                    validator: (_, value) =>
                                        value < 0
                                            ? Promise.reject("Lương không được âm!")
                                            : Promise.resolve()
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Nhập lương tối thiểu" />
                        </Form.Item>

                        {/* Lương tối đa */}
                        <Form.Item
                            label="Lương tối đa (VND)"
                            name="salaryMax"
                            dependencies={["salaryMin"]} // Lắng nghe giá trị của salaryMin
                            rules={[
                                { required: true, message: "Vui lòng nhập lương tối đa!" },
                                {
                                    validator: (_, value) =>
                                        value < 0
                                            ? Promise.reject("Lương không được âm!")
                                            : Promise.resolve()
                                },
                                {
                                    validator: (_, value) => {
                                        const salaryMin = form.getFieldValue("salaryMin");
                                        if (value < salaryMin) {
                                            return Promise.reject("Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu!");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Nhập lương tối đa" />
                        </Form.Item>
                        <Form.Item label="Yêu cầu công việc" name="requirements"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Input.TextArea placeholder="Nhập yêu cầu công việc" rows={11}/>
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Hạn nộp hồ sơ" name="applicationDeadline"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>

                            <DatePicker style={{width: "100%"}} format="DD/MM/YYYY"/>
                        </Form.Item>
                        <Form.Item label="Lịch làm việc" name="workSchedule"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Input placeholder="Nhập lịch làm việc"/>
                        </Form.Item>
                        <Form.Item label="Ngành nghề" name="industry"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Select placeholder="Chọn ngành nghề">
                                {
                                    industries && industries.map(industry =>
                                        (<Option key={industry.id} value={industry.id}>{industry.name}</Option>)
                                    )
                                }


                            </Select>
                        </Form.Item>

                        <Form.Item label="Mô tả công việc" name="description"
                                   rules={[{required: true, message: "Vui lòng nhập!"}]}>
                            <Input.TextArea placeholder="Nhập mô tả công việc" rows={11}/>
                        </Form.Item>
                    </Col>


                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Tags" name="tags">
                            <Select mode="tags" placeholder="Nhập tags (kỹ năng, công nghệ...)">
                                {
                                    tags && tags.map(tag =>
                                        (<Option key={tag.id} value={tag.id.toString()}>{tag.name}</Option>)
                                    )
                                }
                            </Select>

                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item label="Tùy chọn nâng cao">
                            <ExpandableInput/>
                        </Form.Item>
                    </Col>

                </Row>


                <Form.Item style={{textAlign: "center", marginTop: 10}}>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s",
                        }}

                    >
                        {isEditing ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
}

export default JobForm;
