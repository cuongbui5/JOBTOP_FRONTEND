import {Button, Col, Form, Image, Input, Row, Select, Upload} from "antd";
import {EditOutlined, SaveOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {uploadFile} from "../../api/UploadFileService.js";
import {getRecruiterProfile, saveRecruiterProfile} from "../../api/RecruiterProfileService.js";
import {useWebStore} from "../../store/WebStore.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";



const nations = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "CL", name: "Chile" },
    { code: "VN", name: "Vietnam" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "KR", name: "South Korea" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "GB", name: "United Kingdom" },
    { code: "IT", name: "Italy" },
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
    { code: "NG", name: "Nigeria" },
    { code: "ZA", name: "South Africa" },

];
const { Option } = Select;



const UpdateRecruiterProfilePage=()=>{
    const [form] = Form.useForm();
    const [companyLogo, setCompanyLogo] = useState(null);
    const [profile,setProfile]=useState(null);
    const {categories}= useWebStore(state => state);
    const {handleRequest}=useApiRequest();

    const fetchRecruiterProfile= async () => {
        await handleRequest(() => getRecruiterProfile(), (res) => {
            if (res.data != null) {
                initForm(res.data)
                setProfile(res.data)

            }
        });
    }

    const initForm=(recruiterProfile)=>{
        if(recruiterProfile==null) return;
        const formattedData = {
            ...recruiterProfile,
            category: recruiterProfile.category?.id || null,
        };

        form.setFieldsValue(formattedData);
        setCompanyLogo(recruiterProfile.companyLogo || "images/company.jpg");
    }

    const handlerImageBeforeUpload= async (file)=> {
        await handleRequest(()=> uploadFile(file),(res)=>{
            setCompanyLogo(res.data)
        })
        return false;
    }




    useEffect(() => {
        fetchRecruiterProfile()
    }, []);

    const handleFinish = async (values) => {
        if(values.category){
            values.category=categories.find(cat => cat.id === values.category);
        }
        if(companyLogo){
            values.companyLogo=companyLogo;
        }
        if(profile&&profile.id){
            values.id=profile.id;
        }

        await handleRequest(()=>saveRecruiterProfile(values),(res)=>{
            console.log(res)
            if(res.status===200){
                setProfile(res.data);
                initForm(res.data);
            }


        })



    };

    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff"}}>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{padding: 40}}

            >

                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="companyName" label="Tên công ty">
                            <Input placeholder="Enter company name"/>
                        </Form.Item>



                        <Form.Item name="description" label="Mô tả công ty">
                            <Input.TextArea spellCheck={false}  placeholder="Tell about your company" autoSize={{minRows: 13, maxRows: 13}}/>
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="companySize" label="Quy mô công ty">
                            <Input placeholder="200-300 nhân viên"/>
                        </Form.Item>
                        <Form.Item name="companyAddress" label="Địa chỉ">
                            <Input placeholder="Enter address"/>
                        </Form.Item>
                        <Form.Item name="category" label="Lĩnh vực">
                            <Select
                                showSearch
                                placeholder="Select a category"
                                optionFilterProp="children"
                                style={{ width: "100%" }}

                            >
                                {categories&& categories.map((category) => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}

                            </Select>
                        </Form.Item>


                        <Form.Item name="nation" label="Quốc Gia">
                            <Select
                                showSearch
                                placeholder="Select a nation"
                                optionFilterProp="children"
                                style={{ width: "100%" }}
                            >
                                {nations.map((nation) => (
                                    <Option key={nation.code} value={nation.name}>
                                        {nation.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="companyWebsite" label="Website">
                            <Input placeholder="Enter link"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item style={{textAlign: "center"}}>
                            <Image width={205} preview={false} height={205} style={{
                                borderRadius: "100px",
                                position: "relative"
                            }} src={!companyLogo||"images/company-logo-default.jpg"}/>
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


            </Form>


        </div>
    )
}

export default UpdateRecruiterProfilePage;