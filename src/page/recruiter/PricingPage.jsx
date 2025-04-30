import {getAllPlans} from "../../api/PlanService.js";
import {useEffect, useState} from "react";
import useApiRequest from "../../hooks/UseHandleApi.js";
import { Col, Row} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import ResponsiveContainer from "../../components/web/ResponsiveContainer.jsx";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";
import {checkoutPlan} from "../../api/CheckoutService.js";

const PricingPage=()=>{
    const [plans, setPlans] = useState([]);
    const {handleRequest}=useApiRequest();
    const fetchPlans=async ()=>{
        await handleRequest(()=>getAllPlans(),(res)=>{
            console.log(res);
            setPlans(res.data)
        })
    }
    // Fetch plans from the API
    useEffect(() => {

        fetchPlans();

    }, []);

    async function handleOnclick(planId) {
        await handleRequest(()=>checkoutPlan(planId),(res)=>{
            console.log(res);
            window.location.href = res.data.sessionUrl
        })
    }

    return (
        <div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff", padding: 20}}>
            <h2 style={{textAlign: 'center', marginBottom: 40}}>Dành cho nhà tuyển dụng</h2>
            <Row gutter={[24, 24]} justify="center">
                {plans.map((plan,index) => (
                    <Col key={plan.id} xs={24} sm={12} md={8} lg={6}>
                        <AnimationWrapper index={index}>
                            <div
                                style={{
                                    height: "450px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    color: "#111",
                                    borderRadius: "16px",
                                    paddingTop: "20px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                                    alignItems: "center",
                                    border: "2px solid #fff",
                                    overflow: "hidden"
                                }}
                            >

                                <div style={{width: "100%", textAlign: "center"}}>
                                    <h2 style={{
                                        width: "100%",
                                        paddingBottom: "2px",
                                        borderBottom: "1px solid #111",
                                        marginBottom: "20px"
                                    }}>{plan.name}</h2>
                                    <p style={{fontSize: 16, marginBottom: 8}}>
                                        {plan.description}
                                    </p>

                                    <p style={{fontSize: 30, fontWeight: 'bold', marginBottom: 8}}>
                                        {plan.price === 0
                                            ? 'Miễn phí'
                                            : `${plan.price.toLocaleString("vi-VN")}₫`}
                                        {plan.price > 0 && <span style={{fontSize: 14, fontWeight: 400}}>/tháng</span>}
                                    </p>

                                    <p style={{fontSize: 15, margin: '8px 0'}}>
                                        <CheckOutlined/> <strong>{plan.durationDays}</strong> ngày sử dụng
                                    </p>
                                    <p style={{fontSize: 15, margin: '8px 0'}}>
                                        <CheckOutlined/> Tối đa <strong>{plan.maxPosts}</strong> bài đăng
                                    </p>

                                </div>

                                {/* NÚT */}
                                <div style={{width: "95%", marginBottom: "10px"}}>
                                    <button
                                        onClick={()=>handleOnclick(plan?.id)}
                                        className={"pricing-btn"}
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            borderRadius: 8,
                                            fontWeight: "bold",
                                            padding: "12px 0",
                                            fontSize: 16,
                                            transition: "background-color 0.3s ease, color 0.3s ease"
                                        }}
                                    >
                                        Chọn gói
                                    </button>
                                </div>


                            </div>

                        </AnimationWrapper>


                    </Col>
                ))}
            </Row>
        </div>
    )

}

export default PricingPage;