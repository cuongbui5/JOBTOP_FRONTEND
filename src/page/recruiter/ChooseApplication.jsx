import {getApplicationsByFilter} from "../../api/ApplicationService.js";
import {Button, Checkbox, Table} from "antd";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import dayjs from "dayjs";
import {createManySlots} from "../../api/InterviewSlotService.js";

// eslint-disable-next-line react/prop-types
const ChooseApplication=({jobId,scheduleId})=>{
    const [applicants, setApplicants] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const {handleRequest} = useApiRequest();
    const fetchApproveApplication = async (id) => {
        await handleRequest(() => getApplicationsByFilter(id, "APPROVED"), (res) => {
            setApplicants(res.data);
        });
    };
    useEffect(() => {
        if(jobId){
            fetchApproveApplication(jobId);
        }

    }, [jobId]);






    const handleSelectCandidate = (candidateId) => {
        setSelectedCandidates((prevSelected) =>
            prevSelected.includes(candidateId)
                ? prevSelected.filter((id) => id !== candidateId)
                : [...prevSelected, candidateId]
        );
    };



    const columns = [
        {
            title: "Chọn",
            dataIndex: "id",
            key: "select",
            responsive: ["xs", "sm", "md", "lg", "xl"],
            render: (id) => (
                <Checkbox
                    checked={selectedCandidates.includes(id)}
                    onChange={() => handleSelectCandidate(id)}
                />
            ),
        },
        {
            title: "Tên ứng viên",
            dataIndex: "fullName",
            key: "fullName",
            responsive: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            responsive: ["xs", "sm", "md", "lg", "xl"],

        },
        {
            title: "CV",
            dataIndex: "linkCv",
            key: "linkCv",
            responsive: ["md", "lg", "xl"],
            render: (_, record) => (
                <a href={record?.resume?.link} target="_blank" rel="noopener noreferrer">
                    Xem CV
                </a>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            responsive: ["md", "lg", "xl"],
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdAt",
            key: "createdAt",
            responsive: [ "sm", "md", "lg", "xl"],
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },

    ];

    async function handleCreateManySlots() {
        console.log(selectedCandidates)
        console.log(scheduleId)
        await handleRequest(()=>createManySlots({interviewScheduleId:scheduleId,applicationIds:selectedCandidates}),(res)=>{
            console.log(res)
            fetchApproveApplication(jobId)

        })

    }

    return (
        <div>
            <h2>Danh sách ứng viên đủ điều kiện</h2>
            <Table dataSource={applicants} columns={columns} rowKey="id" pagination={false}/>
            <Button style={{marginTop:10}} onClick={handleCreateManySlots}>Thêm người</Button>
        </div>
    )
}

export default ChooseApplication;