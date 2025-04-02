import {useEffect, useState} from "react";
import {Form, Input, Button, DatePicker, Upload, Row, Col, Image, Alert, Switch, Flex, Modal} from "antd";
import { EditOutlined, EyeOutlined, SaveOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Radio } from "antd"
import {getUserProfile, saveUserProfile} from "../../api/UserProfileService.js";
import {uploadFile} from "../../api/UploadFileService.js";
import UserProfileCard from "../../components/user/UserProfileCard.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
dayjs.extend(utc);
dayjs.extend(timezone);





const UpdateUserProfile = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [profile,setProfile]=useState(null);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const {handleRequest}=useApiRequest()

    const initForm=(profile)=>{
        if(profile==null){
            return;
        }
        const formattedData = {
            ...profile,
            dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null
        };

        form.setFieldsValue(formattedData);
        setImage(profile.image || "/images/user_default.png");

    }

    const fetchUserProfile=async ()=>{
        await handleRequest(()=>getUserProfile(),(res)=>{
            console.log(res)
            if(res.status===200){
                initForm(res.data)
                setProfile(res.data)
            }
        },null,true)
    }


    useEffect(() => {
        fetchUserProfile();

    }, []);






    const handleFinish = async (values) => {
        if(values.dateOfBirth){
            console.log("xo")
            values.dateOfBirth = dayjs(values.dateOfBirth).utcOffset(0, true).toISOString();
        }
        if(image){
            values.image=image;
        }

        if(profile?.id){
            values.id=profile.id;
        }

        await handleRequest(()=>saveUserProfile(values),(res)=>{
            console.log(res)
            if(res.status===200){
                initForm(res.data)
                setProfile(res.data)

            }


        },null,true)



    };

    const handlerImageBeforeUpload= async (file)=> {
        await handleRequest(()=> uploadFile(file),(res)=>{
            setImage(res.data)
        })
        return false;
    }




    return (

        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{padding: 40}}

            >
                <Alert
                    description="Ảnh đại diện và CV sẽ không được lưu nếu bạn không ấn nút 'Update profile'."
                    type="warning"
                    showIcon
                    style={{marginBottom: 20}}
                />
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="fullName" label="Họ và tên:">
                            <Input placeholder="Enter full name"/>
                        </Form.Item>
                        <Form.Item name="dateOfBirth" label="Ngày sinh">
                            <DatePicker style={{width: "100%"}} format="DD/MM/YYYY"/>
                        </Form.Item>
                        <Form.Item name="education" label="Học vấn">
                            <Input placeholder="Enter education details"/>
                        </Form.Item>

                        <Form.Item name="skills" label="Kỹ năng">
                            <Input.TextArea placeholder="Enter your skills" autoSize={{minRows: 5, maxRows: 5}}/>
                        </Form.Item>
                        <Form.Item label="Giới tính" name="gender">
                            <Radio.Group>
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                                <Radio value="OTHER">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>


                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="phone" label="Số điện thoại">
                            <Input placeholder="Enter phone number"/>
                        </Form.Item>
                        <Form.Item name="address" label="Địa chỉ">
                            <Input placeholder="Enter address"/>
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả bản thân">
                            <Input.TextArea placeholder="Tell about yourself" autoSize={{minRows: 9, maxRows: 9}}/>
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={12} md={8}>

                        <Form.Item style={{textAlign: "center"}}>
                            <Image width={205} preview={false} height={205} style={{
                                borderRadius: "100px",
                                position: "relative"
                            }} src={image || "images/user_default.png"}/>
                            <Upload
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={handlerImageBeforeUpload}

                            >
                                <Button style={{position: "absolute", bottom: 0, left: 120}}>
                                    <EditOutlined/>Edit
                                </Button>
                            </Upload>


                        </Form.Item>


                    </Col>
                </Row>

                <Form.Item label="Công khai hồ sơ" name="publicProfile" valuePropName="checked">
                    <Switch checked={isPublic} onChange={setIsPublic}/>
                </Form.Item>

                <Flex gap={20} justify={"space-between"}>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined/>}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                height: "45px",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",

                            }}
                        >
                            Update profile
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button

                            icon={<EyeOutlined/>}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                height: "45px",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",

                            }}
                            disabled={profile==null}
                            onClick={()=>setIsModalOpen(true)}
                        >
                            Xem profile
                        </Button>
                    </Form.Item>

                </Flex>

            </Form>

            <div>

                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width={850}
                    style={{ top: 10 }}

                >
                    <UserProfileCard  user={profile}/>
                </Modal>
            </div>


        </div>
    );
};

export default UpdateUserProfile;