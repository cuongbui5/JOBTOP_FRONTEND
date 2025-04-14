import { Form, Input } from "antd";
// eslint-disable-next-line react/prop-types
const CustomInputItem = ({ label, ...rest }) => {
    return (
        <Form.Item label={<span style={{ fontSize: "medium" }}>{label}</span>}     {...rest}>
            <Input
                style={{
                    borderRadius: "0",
                    height: "40px",

                }}


                placeholder={`Vui lòng nhập ${label?.toLowerCase()}`}
            />
        </Form.Item>
    );
};
export default CustomInputItem;