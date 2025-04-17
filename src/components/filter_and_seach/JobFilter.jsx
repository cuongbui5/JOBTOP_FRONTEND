import { useEffect } from "react"
import { Button } from "antd"
import { useWebStore } from "../../store/WebStore.jsx"
import useJobStore from "../../store/JobStore.jsx"
import MultiSelectFilter from "./MultiSelectFilter.jsx";
import SingleSelectFilter from "./SingleSelectFilter.jsx";


const salaryOptions = [
    { key: "below_10m", label: "Dưới 10 triệu" },
    { key: "10m_20m", label: "10 - 20 triệu" },
    { key: "20m_30m", label: "20 - 30 triệu" },
    { key: "30m_50m", label: "30 - 50 triệu" },
    { key: "above_50m", label: "Trên 50 triệu" },
]



const experienceOptions = [
    { key: "NO_REQUIREMENT", label: "Chưa có kinh nghiệm" },
    { key: "LESS_THAN_ONE_YEAR", label: "Dưới 1 năm" },
    { key: "ONE_YEAR", label: "1 năm" },
    { key: "TWO_YEARS", label: "2 năm" },
    { key: "THREE_YEARS", label: "3 năm" },
    { key: "FOUR_YEARS", label: "4 năm" },
    { key: "FIVE_YEARS", label: "5 năm" },
    { key: "MORE_THAN_FIVE_YEARS", label: "Trên 5 năm" },
]

const jobTypeOptions = [
    { key: "ALL", label: "Tất cả" },
    { key: "FULL_TIME", label: "Toàn thời gian" },
    { key: "PART_TIME", label: "Bán thời gian" },
    { key: "INTERNSHIP", label: "Thực tập" },
    { key: "OTHER", label: "Khác" },
]

const JobFilter = () => {
    const { companies, categories } = useWebStore((state) => state)
    const { setFilters, filters, setCurrentPage } = useJobStore((state) => state)

    // Chuyển đổi dữ liệu companies và categories để phù hợp với MultiSelectFilter
    const companyOptions =
        companies?.map((company) => ({
            key: company.id,
            label: company.name,
        })) || []

    const categoryOptions =
        categories?.map((category) => ({
            key: category.id,
            label: category.name,
        })) || []

    useEffect(() => {
        setCurrentPage(1)
    }, [filters, setCurrentPage])

    // Hàm xử lý khi áp dụng filter
    const handleApplyFilter = (selectedValues, type) => {
        // Nếu chỉ chọn một giá trị, giữ nguyên logic cũ
        // Nếu chọn nhiều giá trị, lưu dưới dạng mảng
        const value = selectedValues.length === 1 ? selectedValues[0] : selectedValues.length > 0 ? selectedValues : null
        setFilters({ [type]: value })
    }
    const handleApplySingleFilter = (selectedValue, type) => {
        setFilters({ [type]: selectedValue })
    }

    // Lấy giá trị đã chọn cho mỗi filter
    const getSelectedValues = (type) => {
        const value = filters?.[type]
        if (!value) return []
        return Array.isArray(value) ? value : [value]
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "40px",
                flexWrap: "wrap",
            }}
        >
            <MultiSelectFilter
                items={categoryOptions}
                initialSelectedIds={getSelectedValues("categoryId")}
                onApply={(selectedIds) => handleApplyFilter(selectedIds, "categoryId")}
                placeholder="Lĩnh vực"
                labelKey="label"
                valueKey="key"

            />


            <SingleSelectFilter
                items={salaryOptions}
                initialSelectedId={filters?.salaryRange}
                onApply={(selectedId) => handleApplySingleFilter(selectedId, "salaryRange")}
                placeholder="Mức lương"
                labelKey="label"
                valueKey="key"

            />


            <MultiSelectFilter
                items={experienceOptions}
                initialSelectedIds={getSelectedValues("exp")}
                onApply={(selectedIds) => handleApplyFilter(selectedIds, "exp")}
                placeholder="Kinh nghiệm"
                labelKey="label"
                valueKey="key"

            />

            <MultiSelectFilter
                items={companyOptions}
                initialSelectedIds={getSelectedValues("companyId")}
                onApply={(selectedIds) => handleApplyFilter(selectedIds, "companyId")}
                placeholder="Công ty"
                labelKey="label"
                valueKey="key"

            />

            <MultiSelectFilter
                items={jobTypeOptions}
                initialSelectedIds={getSelectedValues("job_type")}
                onApply={(selectedIds) => handleApplyFilter(selectedIds, "job_type")}
                placeholder="Hình thức làm việc"
                labelKey="label"
                valueKey="key"

            />

        </div>
    )
}

export default JobFilter
