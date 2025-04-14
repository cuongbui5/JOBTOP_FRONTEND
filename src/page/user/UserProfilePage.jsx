import {useEffect, useState} from "react";
import {
    Form,
    Row,
    Col,
    Switch,
    Radio,
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




dayjs.extend(utc);
dayjs.extend(timezone);

const UpdateUserProfile = () => {
    const [formDetail] = Form.useForm();
    const {handleRequest} = useApiRequest();
    const [isPublic, setIsPublic] = useState(true);
    const [profile, setProfile] = useState(null);


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

    useEffect(() => {

        fetchUserProfile();
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
                        <Form.Item name="gender" label="Giới tính">
                            <Radio.Group>
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                                <Radio value="OTHER">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <CustomInputItem name="phone" label="Số điện thoại"/>
                        <CustomInputItem name="address" label="Địa chỉ"/>
                        <CustomInputArea name="description" label="Mô tả bản thân" line={10}/>
                        <CustomInputDate name="dateOfBirth" label="Ngày sinh"/>
                        <CustomInputItem name="education" label="Học vấn"/>
                        <CustomInputArea name="skills" label="Kỹ năng" line={10}/>
                        <CustomInputArea name="workExperience" label="Kinh nghiệm làm việc" line={10}/>
                        <Form.Item label="Công khai hồ sơ" name="publicProfile" valuePropName="checked">
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
