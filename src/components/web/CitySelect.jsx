import CustomSelectItem from "./CustomSelectItem.jsx";
import cities from "/src/utils/cities-vn.json"
import { Select } from "antd";
const CitySelect = ({labelHidden=false,onChange}) => {
    return (
        <CustomSelectItem
            name={"city"}
            hiddenLabel={labelHidden}
            onChange={onChange}
            label={"Chọn thành phố"}
        >
            {cities.map((city) => (
                <Select.Option key={city.id} value={city.name}>
                    {city.name}
                </Select.Option>
            ))}
        </CustomSelectItem>
    );
};

export default CitySelect;