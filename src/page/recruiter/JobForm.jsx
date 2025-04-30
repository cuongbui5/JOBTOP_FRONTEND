import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getJob, createJob,updateJob} from "../../api/JobService.js";
import dayjs from "dayjs";
import {Button, Col, DatePicker, Form, Input, message, Row, Select} from "antd";
import useApiRequest from "../../hooks/UseHandleApi.js";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import CustomInputItem from "../../components/web/CustomInputItem.jsx";
import CustomSelectItem from "../../components/web/CustomSelectItem.jsx";
import CustomInputArea from "../../components/web/CustomInputArea.jsx";
import CustomInputDate from "../../components/web/CustomInputDate.jsx";
import {getStoredUser, saveUser} from "../../utils/helper.js";

const jobEx = {
    title: "Software Engineer",
    location: "Tòa nhà Rivera Park, 69 Đ. Vũ Trọng Phụng, Thanh Xuân",
    city: "Hà Nội",
    requirements: "Tốt nghiệp chuyên ngành Công nghệ thông tin, Khoa học máy tính hoặc ngành liên quan.\n" +
        "Thành thạo ít nhất một trong các ngôn ngữ lập trình: Java, Python, JavaScript, TypeScript, C#,...\n" +
        "Có kinh nghiệm làm việc với React.js, Angular, Vue.js (đối với frontend) hoặc Spring Boot, Node.js, Django (đối với backend) là lợi thế.\n" +
        "Kiến thức tốt về cơ sở dữ liệu SQL/NOSQL (MySQL, PostgreSQL, MongoDB, Redis).\n" +
        "Kinh nghiệm làm việc với các hệ thống RESTful API, GraphQL.\n" +
        "Hiểu biết về CI/CD, Docker, Kubernetes là một điểm cộng.\n" +
        "Kỹ năng làm việc nhóm, tư duy logic và giải quyết vấn đề tốt.\n" +
        "Đọc hiểu tài liệu tiếng Anh, giao tiếp cơ bản là một lợi thế.",
    salaryMax:10000000,
    salaryMin:5000000,
    benefits: "Lương cạnh tranh, thưởng theo hiệu suất.\n" +
        "Môi trường làm việc hiện đại, năng động, cơ hội thăng tiến rõ ràng.\n" +
        "Được đào tạo và tiếp cận công nghệ mới.\n" +
        "Bảo hiểm sức khỏe, du lịch hàng năm, team-building cùng công ty.\n" +
        "Linh hoạt thời gian làm việc, hỗ trợ remote/hybrid nếu cần.",
    applicationDeadline: dayjs("2025-05-31"),
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
    const { id } = useParams();
    const {handleRequest}=useApiRequest()
    const isEditing = Boolean(id);
    const [job, setJob] = useState(null);

    // Nếu là chỉnh sửa, tải dữ liệu job
    useEffect(() => {
        if (isEditing){
            const fetchJob=async (id)=>{
                await handleRequest(()=>getJob(id,false),(res)=>{
                    console.log(res)
                    setJob(res.data)

                    const data = {
                        ...res.data,
                        industry: res.data.industry?.id, // Đảm bảo job.industry không bị undefined
                        applicationDeadline: res.data.applicationDeadline ? dayjs(res.data.applicationDeadline) : null, // Chuyển đổi ngày deadline
                    };
                    form.setFieldsValue(data)
                })
            }
            fetchJob(id);

        }else {
            form.setFieldsValue(jobEx)
        }


    }, [id]);

    const handlerValues=(values)=>{


        if(values.applicationDeadline){
            values.applicationDeadline= dayjs(values.applicationDeadline).utcOffset(0, true).toISOString();

        }

        return values;
    }

    const handleFinish =async (values) => {
        const jobData=handlerValues(values);

        if(isEditing){
            await handleRequest(()=>updateJob(job.id,jobData),(res)=>{
                console.log(res)
                if(res.status===200){
                    message.success(res.message)

                }
            })

        }else {
            await handleRequest(()=>createJob(jobData),(res)=>{
                console.log(res)
                if(res.status===200){
                    message.success(res.message)
                    const user=getStoredUser();
                    user.freePost=user.freePost-1;
                    saveUser(user)



                }
            })

        }


    };

    // Xử lý form submit

    return (
        <ResponsiveContainer>
            <h1 style={{marginBottom:"20px"}}>{isEditing ? "Cập nhật tin tuyển dụng" : "Đăng tin tuyển dụng"}</h1>


            <Form form={form} layout="vertical" onFinish={handleFinish}

                //initialValues={jobEx}
                //initialValues={job?jobEx:job}
            >
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <CustomInputItem name="title" label="Tiêu đề công việc"/>
                        <CustomInputItem name="location" label="Địa điểm"/>
                        <CustomInputItem name="city" label="Thành phố"/>
                        <CustomInputItem label="Lịch làm việc" name="workSchedule"/>
                        <CustomInputItem name="city" label="Thành phố"/>
                        <CustomInputDate name="applicationDeadline" label="Hạn nộp hồ sơ"/>

                        <Form.Item
                            label={<span style={{fontSize: "medium"}}>Lương tối thiểu (VND)</span>}
                            name="salaryMin"
                            rules={[
                                {required: true, message: "Vui lòng nhập lương tối thiểu!"},
                                {
                                    validator: (_, value) =>
                                        value < 0
                                            ? Promise.reject("Lương không được âm!")
                                            : Promise.resolve()
                                }
                            ]}
                        >
                            <Input style={{borderRadius: "0", height: "40px"}} type="number" placeholder="Nhập lương tối thiểu"/>
                        </Form.Item>

                        {/* Lương tối đa */}
                        <Form.Item
                            label={<span style={{fontSize: "medium"}}>Lương tối đa (VND)</span>}
                            name="salaryMax"
                            dependencies={["salaryMin"]} // Lắng nghe giá trị của salaryMin
                            rules={[
                                {required: true, message: "Vui lòng nhập lương tối đa!"},
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
                            <Input style={{borderRadius: "0", height: "40px"}} type="number" placeholder="Nhập lương tối đa"/>
                        </Form.Item>
                        <CustomSelectItem label="Kinh nghiệm" name="experienceLevel">
                            <Option value="NO_REQUIREMENT">Không yêu cầu</Option>
                            <Option value="LESS_THAN_ONE_YEAR">Dưới 1 năm</Option>
                            <Option value="ONE_YEAR">1 năm</Option>
                            <Option value="TWO_YEARS">2 năm</Option>
                            <Option value="THREE_YEARS">3 năm</Option>
                            <Option value="FOUR_YEARS">4 năm</Option>
                            <Option value="FIVE_YEARS">5 năm</Option>
                            <Option value="MORE_THAN_FIVE_YEARS">Trên 5 năm</Option>
                        </CustomSelectItem>


                        <CustomSelectItem name="jobType" label="Hình thức làm việc">
                            <Option value="ALL">Tất cả</Option>
                            <Option value="FULL_TIME">Toàn thời gian</Option>
                            <Option value="PART_TIME">Bán thời gian</Option>
                            <Option value="INTERNSHIP">Thực tập</Option>
                            <Option value="OTHER">Khác</Option>
                        </CustomSelectItem>





                    </Col>
                    <Col xs={24} md={12}>
                        <CustomInputArea  name="description" label="Mô tả công việc" line={11}/>
                        <CustomInputArea  name="benefits" label="Quyền lợi" line={12}/>
                        <CustomInputArea  name="requirements" label="Yêu cầu công việc" line={12}/>

                    </Col>
                </Row>


                <Form.Item style={{ marginTop: 10}}>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{borderRadius: "0"}}

                    >
                        {isEditing ? "Cập nhật" : "Đăng ngay"}
                    </Button>
                </Form.Item>
            </Form>

        </ResponsiveContainer>


    );
}

export default JobForm;
