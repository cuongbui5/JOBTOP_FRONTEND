import { Form, Input } from "antd";
// eslint-disable-next-line react/prop-types
const CustomInputArea = ({ label,line, ...rest }) => {
    return (

        <Form.Item label={<span style={{ fontSize: "medium" }}>{label}</span>}     {...rest}>
            <Input.TextArea
                spellCheck={false}
                placeholder={`Vui lòng nhập ${label?.toLowerCase()}`}
                autoSize={{minRows: line, maxRows: line}}
                style={{borderRadius: "0", fontSize: "14px"}}
            />

        </Form.Item>
    );
};
export default CustomInputArea;