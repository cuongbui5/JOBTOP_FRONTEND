// eslint-disable-next-line react/prop-types
const SalaryText=({salaryMin,salaryMax,size="medium"})=> {

    if(salaryMin===0&&salaryMax===0) {
        return <p style={{fontSize: size}}>
           Thỏa thuận
        </p>
    }
    return <p style={{fontSize: size}}>
        {new Intl.NumberFormat("vi-VN").format(salaryMin)}đ - {new Intl.NumberFormat("vi-VN").format(salaryMax)}đ/tháng
    </p>
}

export default SalaryText;