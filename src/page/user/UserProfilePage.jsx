import {useEffect, useState} from "react";
import {
    Form,
    Row,
    Col,
    Switch,
    Radio,
    Select
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {getUserProfile, saveUserProfile} from "../../api/UserProfileService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import CustomInputItem from "../../components/web/CustomInputItem.jsx";
import CustomButton from "../../components/web/CustomButton.jsx";
import CustomInputDate from "../../components/web/CustomInputDate.jsx";
import CustomInputArea from "../../components/web/CustomInputArea.jsx";
import CustomSelectItem from "../../components/web/CustomSelectItem.jsx";
import {EducationLevel, ExperienceLevel, PositionLevel} from "../../utils/helper.js";
import {getAllDesiredPositions} from "../../api/PublicService.js";
import CitySelect from "../../components/web/CitySelect.jsx";




dayjs.extend(utc);
dayjs.extend(timezone);

const UpdateUserProfile = () => {
    const [formDetail] = Form.useForm();
    const {handleRequest} = useApiRequest();
    const [isPublic, setIsPublic] = useState(true);
    const [profile, setProfile] = useState(null);
    const [positions, setPositions] = useState(null);


    const initForm = (profile) => {
        if (!profile) return;


        const formattedData = {
            ...profile,
            dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null
        };



        formDetail.setFieldsValue(formattedData);

    };



    const fetchUserProfile = async () => {
        await handleRequest(() => getUserProfile(), (res) => {
            if (res.status === 200) {
                initForm(res.data);
                setProfile(res.data);
            }
        }, null, true);
    };
    const fetchAllPosition = async () => {
        await handleRequest(() => getAllDesiredPositions(), (res) => {
            if (res.status === 200) {
                console.log(res)

                setPositions(res.data);
            }
        }, null);
    };

    useEffect(() => {

        fetchUserProfile();
        fetchAllPosition();
    }, []);

    const handleSaveDetail = async (values) => {
        if (values.dateOfBirth) {
            values.dateOfBirth = dayjs(values.dateOfBirth).utcOffset(0, true).toISOString();
        }
        if (profile?.id) values.id = profile.id;

        await handleRequest(() => saveUserProfile(values), (res) => {
            if (res.status === 200) {
                initForm(res.data);
                setProfile(res.data);
            }
        }, null, true);
    };



    return (
        <ResponsiveContainer>
            <h1 style={{margin:"20px 0"}}>Cập nhật thông tin ứng viên</h1>
            <Form
                layout="vertical"
                form={formDetail}
                onFinish={handleSaveDetail}
            >
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <CustomInputItem name="fullName" label="Họ và tên"/>
                        <CustomInputItem name="phone" label="Số điện thoại"/>
                        <CustomInputDate name="dateOfBirth" label="Ngày sinh"/>
                        <CustomInputItem name="address" label="Địa chỉ"/>
                        <CitySelect/>
                        <CustomInputArea name="description" label="Mô tả bản thân" line={10}/>
                        <CustomInputItem name="workLocation" label="Nơi làm việc"/>
                        <Form.Item name="gender" label="Giới tính">
                            <Radio.Group>
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                                <Radio value="OTHER">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>



                        <CustomSelectItem name="education" label="Học vấn">
                            {Object.entries(EducationLevel).map(([value, { text }]) => (
                                <Select.Option key={value} value={value}>{text}</Select.Option>
                            ))}
                        </CustomSelectItem>
                        <CustomSelectItem name="positionLevel" label="Cấp bậc">
                            {Object.entries(PositionLevel).map(([value, { text }]) => (
                                <Select.Option key={value} value={value}>{text}</Select.Option>
                            ))}
                        </CustomSelectItem>

                        <CustomInputItem name="expectedSalary" label="Mức lương mong muốn"/>

                        <CustomSelectItem name="workExperience" label="Kinh nghiệm làm việc">
                            {Object.entries(ExperienceLevel).map(([value, { text }]) => (
                                <Select.Option key={value} value={value}>{text}</Select.Option>
                            ))}
                        </CustomSelectItem>

                        <Form.Item label="Vị trí mong muốn" name="desiredPosition">
                            <Select
                                mode="tags"
                                maxTagCount={1}
                                onChange={(value) => {
                                    if (Array.isArray(value)) {
                                        formDetail.setFieldsValue({ desiredPosition: value[0] || null });
                                    }
                                }}
                                options={positions && positions.map((item) => ({
                                    label: item,
                                    value: item
                                }))}
                                filterOption={(input, option) =>
                                    option?.label?.toLowerCase().includes(input.toLowerCase())
                                }
                                value={formDetail.getFieldValue("desiredPosition") ? [formDetail.getFieldValue("desiredPosition")] : []}
                            />
                        </Form.Item>




                        <Form.Item label="Cho phép tìm kiếm hồ sơ" name="searchable" valuePropName="checked">
                            <Switch checked={isPublic} onChange={setIsPublic} />
                        </Form.Item>

                    </Col>

                </Row>
                <Form.Item>
                    <CustomButton content={"Cập nhật"} size={"large"} type={"primary"}/>
                </Form.Item>

            </Form>

        </ResponsiveContainer>
    );
};

export default UpdateUserProfile;
