import { useState} from "react";
import { useWebStore } from "../../store/WebStore.jsx";
import { List, Select } from "antd";
import LoadingWrapper from "../../components/loading/LoadingWrapper.jsx";
import AnimationWrapper from "../../components/animation/AnimationWrapper.jsx";
import CompanyCard from "../../components/company/CompanyCard.jsx";

const { Option } = Select;

const CompaniesPage = () => {
    const { companies, categories } = useWebStore(state => state);
    const [selectedCategory, setSelectedCategory] = useState(null);



    const filteredCompanies = selectedCategory
        ? companies.filter(company => company.category.id === selectedCategory)
        : companies;



    return (
        <div style={{ padding: "40px 20px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                    gap: 20,
                }}
            >
                <h1 style={{ marginLeft: "8px" }}>Tất cả công ty</h1>

                <Select
                    style={{ width: 200 }}
                    placeholder="Lọc theo danh mục"
                    onChange={(value) => setSelectedCategory(value)}
                    allowClear
                >
                    {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </div>

            <LoadingWrapper loadingType={"applied-jobs"}>
                <List
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 4,
                    }}
                    dataSource={filteredCompanies}
                    renderItem={(company, index) => (
                        <List.Item>
                            <AnimationWrapper index={index}>
                                <CompanyCard company={company} noEffect={true} />
                            </AnimationWrapper>
                        </List.Item>
                    )}
                />
            </LoadingWrapper>
        </div>
    );
};

export default CompaniesPage;
