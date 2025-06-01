import {Button, Col, Form, Image, Popover, Row, Select, Upload} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {uploadFile} from "../../api/UploadFileService.js";
import {
    createCompany,
    getCompanyProfile,

    updateCompany
} from "../../api/CompanyService.js";
import {useWebStore} from "../../store/WebStore.jsx";
import useApiRequest from "../../hooks/UseHandleApi.js";
import CustomInputItem from "../../components/web/CustomInputItem.jsx";
import CustomSelectItem from "../../components/web/CustomSelectItem.jsx";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import CustomInputArea from "../../components/web/CustomInputArea.jsx";



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




const UpdateCompanyPage=()=>{
    const [form] = Form.useForm();
    const [logo, setLogo] = useState(null);
    const [company,setCompany]=useState(null);
    const {categories}= useWebStore(state => state);
    const {handleRequest}=useApiRequest();

    const fetchCompany= async () => {
        await handleRequest(() => getCompanyProfile(), (res) => {
            console.log(res.data)
            const company=res.data;
            setCompany(company)
            initForm(company)
        });
    }

    const initForm=(company)=>{
        const formattedData = {
            ...company,
            category: company.category?.id || null,
        };

        form.setFieldsValue(formattedData);
        setLogo(company.logo || "/images/company.jpg");
    }

    const handlerImageBeforeUpload= async (file)=> {
        await handleRequest(()=> uploadFile(file),(res)=>{
            setLogo(res.data)
        })
        return false;
    }




    useEffect(() => {
        fetchCompany()
    }, []);

    const handleFinish = async (values) => {
        if(values.category){
            values.category=categories.find(cat => cat.id === values.category);
        }
        if(logo){
            values.logo=logo;
        }
        if(company.id!=null){
            console.log("updated")
            await handleRequest(()=>updateCompany(company.id,values),(res)=>{
               console.log(res)

            },null,true)


        }else {
            console.log("crete")
            await handleRequest(()=>createCompany(values),(res)=>{
                console.log(res)
                setCompany(res.data)
            },null,true)

        }




    };

    return (
        <ResponsiveContainer>
            <h1 style={{marginBottom: 20}}>Cập nhật thông tin công ty</h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <CustomInputItem name="name" label="Tên công ty"/>
                        <CustomInputItem name="foundedDate" label="Năm thành lập"/>
                        <CustomInputItem name="size" label="Quy mô công ty"/>
                        <CustomInputItem name="address" label="Địa chỉ"/>
                        <CustomInputItem name="website" label="Website"/>
                        <CustomInputArea name="description" label="Mô tả công ty" line={20}/>

                        <CustomSelectItem name="category" label="Lĩnh vực">
                            {categories?.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </CustomSelectItem>


                        <CustomSelectItem name="nation" label="Quốc gia">
                            {nations.map((nation) => (
                                <Select.Option key={nation.code} value={nation.name}>
                                    {nation.name}
                                </Select.Option>
                            ))}
                        </CustomSelectItem>


                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item label={<span style={{fontSize: "medium"}}>Logo</span>}>
                            <Popover
                                content={<Upload
                                    maxCount={1}
                                    showUploadList={false}
                                    beforeUpload={handlerImageBeforeUpload}
                                >
                                    <Button>
                                        <EditOutlined/> Cập nhật logo
                                    </Button>
                                </Upload>}
                                trigger="hover"
                                placement="right"

                            >
                                <Image
                                    width={300}
                                    preview={false}
                                    style={{
                                        background: "#555",
                                        border: "1px solid #444"
                                    }}
                                    src={logo || '/images/company-logo-default.jpg'}
                                />
                            </Popover>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button style={{borderRadius: 0}} type="primary" htmlType="submit" size={"large"}>
                        Cập nhật
                    </Button>
                </Form.Item>


            </Form>


        </ResponsiveContainer>


    )
}

export default UpdateCompanyPage;