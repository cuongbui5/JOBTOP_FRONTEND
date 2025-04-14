import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "antd";
import { loginByOauth } from "../../api/AuthService.js";
import useHandleApi from "../../hooks/UseHandleApi.js";


const { Text } = Typography;

const CallBack = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();
    const {handleRequest}=useHandleApi();

    useEffect(() => {
        const handlerLoginByOauth = async (code) => {
            if (!code) {
                //setStatus("Không tìm thấy mã xác thực.");
                navigate("/login")
                return;
            }


            await handleRequest(
                () => loginByOauth(code),
                (res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    navigate("/")
                }
            );
        };

        handlerLoginByOauth(code);
    }, []);

    return (

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f4f4f4"
            }}>
                <Text style={{display: "block", marginTop: 20, fontSize: 16}}>Loading ...</Text>

            </div>


    );
};

export default CallBack;
