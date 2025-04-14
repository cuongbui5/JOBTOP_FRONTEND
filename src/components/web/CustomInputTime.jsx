import { Form, TimePicker} from "antd";
// eslint-disable-next-line react/prop-types
const CustomInputTime= ({ label, ...rest }) => {
    return (
        <Form.Item label={<span style={{ fontSize: "medium" }}>{label}</span>}     {...rest}>
            <TimePicker  style={{borderRadius: "0", height: "40px",width:"100%"}} format="HH:mm"  />
        </Form.Item>
    );
};
export default CustomInputTime;