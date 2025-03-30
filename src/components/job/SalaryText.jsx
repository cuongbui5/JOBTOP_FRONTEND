const SalaryText=({salaryMin,salaryMax,size="medium"})=> {
    return <p style={{fontSize:size}}>
        {new Intl.NumberFormat("vi-VN").format(salaryMin)}đ - {new Intl.NumberFormat("vi-VN").format(salaryMax)}đ/tháng
    </p>
}

export default SalaryText;