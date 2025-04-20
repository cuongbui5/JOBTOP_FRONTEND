import { Modal } from "antd";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import useModalStateStore from "../../store/ModalStateStore.js";



const AIEvaluationModal = () => {
    const {openAIEvaluationModal,setOpenAIEvaluationModal,contentAIEvaluationModal}=useModalStateStore(state => state);
    return (
        <Modal
            title="Kết quả đánh giá AI"
            open={openAIEvaluationModal}
            onCancel={()=>setOpenAIEvaluationModal(false)}
            width={600}
            footer={null}
            centered
        >
            <div
                style={{
                    maxHeight: 400,
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                }}
            >
                <LoadingWrapper loadingType="load-evaluate">
                    {contentAIEvaluationModal}
                </LoadingWrapper>
            </div>
        </Modal>
    );
};

export default AIEvaluationModal;
