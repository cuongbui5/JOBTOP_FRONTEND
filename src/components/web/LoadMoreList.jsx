import {useEffect, useState} from "react";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import {Button, List} from "antd";
// eslint-disable-next-line react/prop-types
const LoadMoreList=({fetchFunction, pageSize = 3, renderItem, gridProps = {}, dependencies = []})=>{
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async (page, isLoadMore = false) => {
        const response = await fetchFunction(page, pageSize);
        if (!response) return;

        const { content, currentPage, totalPages } = response.data;

        if (isLoadMore) {
            setItems((prev) => [...prev, ...content]);
        } else {
            setItems(content);
        }

        setCurrentPage(currentPage);
        setTotalPages(totalPages);
    };
    useEffect(() => {
        fetchData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return (
        <LoadingWrapper>
            <List
                grid={gridProps}
                dataSource={items}
                renderItem={(item, index) => renderItem(item, index)}
            />

            {currentPage < totalPages && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                        size={"large"}
                        onClick={() => fetchData(currentPage + 1, true)}
                    >
                        Tải thêm...
                    </Button>
                </div>
            )}
        </LoadingWrapper>
    );

}

export default LoadMoreList;