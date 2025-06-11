import { Button, Card, DatePicker, message } from 'antd';
import { useState } from 'react';
import useApiRequest from "../../hooks/UseHandleApi.js";
import {getRevenueDetailByYear} from "../../api/TransactionService.js";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';


const RevenueReportDownloader = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(false);
    const {handleRequest}=useApiRequest();
    const exportMonthlyRevenueToExcel = (data, year) => {
        const title = `BÁO CÁO DOANH THU NĂM ${year}`;
        const headers = ['Tháng', 'Doanh thu (VNĐ)'];
        const rows = data.map(item => [`Tháng ${item.month}`, item.revenue]);

        const worksheetData = [[title], [], headers, ...rows];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Merge title across 2 columns
        worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];

        // Set column width
        worksheet['!cols'] = [{ wch: 15 }, { wch: 20 }];

        // Apply some basic styling (only possible with certain tools, here we keep basic formatting)

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo doanh thu');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        saveAs(blob, `bao_cao_doanh_thu_${year}.xlsx`);
    };

    const handleDownload = async () => {
        if (!selectedYear) {
            message.warning('Vui lòng chọn năm trước khi tải báo cáo.');
            return;
        }

        const year = selectedYear.year();
        setLoading(true);

        await handleRequest(
            () => getRevenueDetailByYear(year),
            (res) => {
                const data = res.data;
                if (!data || data.length === 0) {
                    message.info(`Không có dữ liệu doanh thu cho năm ${year}.`);
                } else {
                    exportMonthlyRevenueToExcel(data, year);
                    message.success(`Đã tải báo cáo doanh thu năm ${year}`);
                }
            },
            () => setLoading(false)
        );

        setLoading(false);
    };

    return (
        <Card title="Tải báo cáo doanh thu theo năm">
            <DatePicker
                picker="year"
                value={selectedYear}
                onChange={setSelectedYear}
                allowClear
                style={{ width: '100%', marginBottom: 16 }}
            />
            <Button
                type="primary"
                block
                onClick={handleDownload}
                loading={loading}
                disabled={!selectedYear}
            >
                Tải file thống kê
            </Button>
        </Card>
    );
};

export default RevenueReportDownloader;
