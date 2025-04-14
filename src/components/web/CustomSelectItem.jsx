import { Form, Select } from "antd";

// eslint-disable-next-line react/prop-types
const CustomSelectItem = ({ label, children, ...rest }) => (
    <Form.Item label={<span style={{ fontSize: "medium" }}>{label}</span>} {...rest}>
        <Select
            style={{ height: "40px" }}
            placeholder={`Select ${label?.toLowerCase()}`}
            showSearch
            optionFilterProp="children"
        >
            {children}
        </Select>
    </Form.Item>
);

export default CustomSelectItem;
