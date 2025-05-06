import { Form, Select } from "antd";

// eslint-disable-next-line react/prop-types
const CustomSelectItem = ({ label,hiddenLabel = false, onChange,children, ...rest }) => (
    <Form.Item  label={hiddenLabel ? undefined : <span style={{ fontSize: "medium" }}>{label}</span>} {...rest}>
        <Select
            style={{ height: "40px" }}
            placeholder={`Select ${label?.toLowerCase()}`}
            showSearch
            allowClear={true}
            onChange={onChange}
            optionFilterProp="children"
        >
            {children}
        </Select>
    </Form.Item>
);

export default CustomSelectItem;
