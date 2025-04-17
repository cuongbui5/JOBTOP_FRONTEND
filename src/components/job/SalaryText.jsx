




// eslint-disable-next-line react/prop-types
const SalaryText = ({salaryMin, salaryMax, size , format}) => {

    const getFontSize = () => {
        switch (size) {
            case "small":
                return "12px"
            case "large":
                return "16px"
            case "medium":
            default:
                return "14px"
        }
    }

    // Định dạng số tiền theo format
    const formatSalary = (value) => {
        if (value === 0) return "0"

        if (format === "full") {
            return new Intl.NumberFormat("vi-VN").format(value) + "đ"
        }

        if (format === "compact") {
            if (value >= 1000000000) {
                return (value / 1000000000).toFixed(1) + " tỷ"
            } else if (value >= 1000000) {
                return (value / 1000000).toFixed(0) + " triệu"
            } else if (value >= 1000) {
                return (value / 1000).toFixed(0) + "K"
            }
            return value
        }

        // Format "short" (mặc định)
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + " tỷ"
        } else if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + " triệu"
        } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K"
        }
        return value.toString()
    }

    // Nếu cả hai giá trị đều là 0, hiển thị "Thỏa thuận"
    if (salaryMin === 0 && salaryMax === 0) {
        return (
            <p
                style={{
                    fontSize: getFontSize(),

                }}
            >
               Thỏa thuận
            </p>
        )
    }

    // Nếu chỉ có một giá trị (min hoặc max)
    if (salaryMin === 0) {
        return (
            <p
                style={{
                    fontSize: getFontSize(),

                }}

            >
               Tới {formatSalary(salaryMax)}/tháng
            </p>
        )
    }

    if (salaryMax === 0) {
        return (
            <p
                style={{
                    fontSize: getFontSize(),

                }}

            >
               Từ {formatSalary(salaryMin)}/tháng
            </p>
        )
    }

    // Trường hợp có cả min và max
    return (
        <p
            style={{
                fontSize: getFontSize(),

            }}
        >
            {formatSalary(salaryMin)} - {formatSalary(salaryMax)}/tháng
        </p>
    )
}

export default SalaryText
