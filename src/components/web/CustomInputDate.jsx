import {DatePicker, Form} from "antd";
// eslint-disable-next-line react/prop-types
const CustomInputDate= ({ label, ...rest }) => {
    return (
        <Form.Item label={<span style={{ fontSize: "medium" }}>{label}</span>}     {...rest}>
            <DatePicker style={{borderRadius: "0", height: "40px",width:"100%"}}  format="DD/MM/YYYY"/>
        </Form.Item>
    );
};
export default CustomInputDate;