import {AutoComplete, Button, Divider, Input, Select} from 'antd';
import {EnvironmentOutlined, SearchOutlined} from '@ant-design/icons';
import {useWebStore} from "../../store/WebStore.jsx";
import {useState} from "react";
import useJobStore from "../../store/JobStore.jsx";



const SearchBar = () => {
    const [keyword, setKeyword] = useState("");
    const [city, setCity] = useState("");
    const {setFilters}=useJobStore(state => state)
    const {cities}=useWebStore(state => state)
    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[\u0111]/g, "d")
            .replace(/[\u0110]/g, "D")
            .toLowerCase();
    };

    const handleSearch = () => {
        setFilters({ keyword, city });
    };




    const options = cities?.filter((c) =>
            removeVietnameseTones(c.name).includes(removeVietnameseTones(city))
        )
        .map((c) => ({
            value: c.name,
            label: `${c.name} (${c.count}+)`,
        }));




    return (
        <div
            style={{
                maxWidth:"600px",
                display: "flex",
                flexDirection:"row",
                justifyContent:"space-between",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                padding: "10px",
                background: "#fff",
                margin:"auto",
                flexWrap:"wrap",
                gap:"10px"
            }}
        >

            <Input
                prefix={<SearchOutlined style={{color: "#555", marginRight: "5px"}}/>}
                placeholder="Job title, keywords, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                    width:"100%",
                    border: "none",
                    outline: "none",
                    height: "40px",
                    borderRadius: "0",
                    borderBottom:"1px solid #999"

                }}
            />




            <AutoComplete
                value={city}
                options={options}

                onChange={setCity}
                style={{
                    border: "none",
                    width:"60%",
                    height: "40px"
                }}
            >
                <Input
                    placeholder='City, province, or "remote"'
                    prefix={<EnvironmentOutlined style={{color: "#555", marginRight: "5px"}}/>}
                    style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        height: "40px",
                        borderRadius: "0",
                        width:"100%",

                    }}
                />
            </AutoComplete>

            {/* Nút tìm kiếm */}
            <Button onClick={handleSearch} type="primary" style={{ width:"25%",marginLeft: "10px", height: "40px", fontWeight: "bold"}}>
                Tìm kiếm
            </Button>
        </div>


    );
};

export default SearchBar;
