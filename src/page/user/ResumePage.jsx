import {Button, Input, List, message, Modal, Upload} from "antd";
import {useEffect, useState} from "react";
import {ExclamationCircleOutlined, InboxOutlined} from "@ant-design/icons";
import {uploadFile} from "../../api/UploadFileService.js";
import useApiRequest from "../../hooks/UseHandleApi.js";
import {createNewResume, deleteResumeById, getAllResumesByUser, updateResumeById} from "../../api/ResumeService.js";
import ResumeCard from "./ResumeCard.jsx";
const { confirm } = Modal;

const ResumePage = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumes,setResumes]=useState(null);
    const [resumeName, setResumeName] = useState(null);
    const [link,setLink]=useState(null);
    const {handleRequest}=useApiRequest();
    const [editingResume, setEditingResume] = useState(null);
    const [mainResumeId, setMainResumeId] = useState(null);

    const handleSetMainResume = (resumeId) => {
        localStorage.setItem("resumeId", resumeId);
        setMainResumeId(resumeId);
    };

    useEffect(() => {
        const fetchResumes=async ()=>{
            await handleRequest(()=>getAllResumesByUser(),(res)=>{
                console.log(res)
                setResumes(res.data||[]);
            })
        }

        fetchResumes();
    }, []);

    const showModal = (resume = null) => {
        if (resume) {
            setEditingResume(resume);
            setResumeName(resume.name);
            setLink(resume.link);
        } else {
            setEditingResume(null);
            setResumeName(null);
            setLink(null);
        }
        setIsModalOpen(true);
    };

    const handleOk =async () => {
        console.log("Resume Name:", resumeName);
        if(!resumeName||!link){
            return;
        }
        if (editingResume) {

            await handleRequest(() => updateResumeById(editingResume.id, { name: resumeName, link }), (res) => {
                setResumes(resumes.map((r) => (r.id === editingResume.id ? { ...r, name: resumeName, link } : r)));
                console.log(res)

            });
        } else {

            await handleRequest(() => createNewResume({ name: resumeName, link }), (res) => {
                setResumes([...resumes, { id: res.data.id, name: resumeName, link }]);

                console.log(res)
            });
        }

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handlerCvBeforeUpload=async (file)=> {
        const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const isPdf = file.type === "application/pdf";

        if (!isDocx && !isPdf) {
            message.warning("Chỉ chấp nhận file .docx hoặc .pdf!")
            return false;
        }


        await handleRequest(()=>uploadFile(file),(res)=>{
            setLink(res.data)
        })


        return false;

    }


    const handleDelete = (resumeId) => {
        console.log(resumeId)

        confirm({
            title: "Xác nhận xóa",
            icon: <ExclamationCircleOutlined />,
            content: "Bạn có chắc chắn muốn xóa CV này không?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                await handleRequest(() => deleteResumeById(resumeId), (res) => {
                    setResumes(resumes.filter((r) => r.id !== resumeId));

                },null,true);
            },
        });
    };

    return (
        <div style={{
            paddingInline:"20px",
            paddingTop:"40px",
            width:"100%"
        }}>
            <div style={{display:"flex",gap:"20px",justifyContent:"space-between"}}>
                <h1>Quản lý CV</h1>
                <Button onClick={()=>showModal(null)} size={"large"}>Upload CV</Button>

            </div>

            <div style={{
                marginTop:"40px",
                width:"100%"
            }}>
                <List
                    grid={{
                        gutter: 10,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 3,
                    }}
                    dataSource={resumes||[]}
                    renderItem={(resume) => (
                        <List.Item>
                            <ResumeCard  onSetMainResume={handleSetMainResume}   mainResumeId={mainResumeId} resume={resume}  onDelete={() => handleDelete(resume.id)} onEdit={() => showModal(resume)} />
                        </List.Item>
                    )}
                />

            </div>

            <Modal
                title={editingResume ? "Cập nhật CV" : "Tải lên CV"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={editingResume ? "Cập nhật" : "Thêm mới"}
            >
                <Input
                    placeholder="Nhập tên CV"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    style={{ marginBottom: "16px" }}
                />

                <Upload.Dragger
                    name="file"
                    multiple={false}
                    beforeUpload={handlerCvBeforeUpload} // Chặn upload tự động
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Kéo thả hoặc bấm để tải lên</p>
                </Upload.Dragger>
            </Modal>
        </div>
    )
}

export default ResumePage;