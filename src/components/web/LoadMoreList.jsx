import {useEffect, useState} from "react";
import LoadingWrapper from "../loading/LoadingWrapper.jsx";
import {Button, List} from "antd";
import {motion} from "framer-motion";
import JobCard from "../job/JobCard.jsx";
// eslint-disable-next-line react/prop-types
const LoadMoreList=({fetchFunction, pageSize = 3, renderItem, gridProps = {}, dependencies = [],type})=>{
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async (page, isLoadMore = false) => {

        const response = await fetchFunction(page, pageSize);
        console.log(response)
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
        <LoadingWrapper loadingType={type}>
            <List
                grid={gridProps}
                dataSource={items}
                renderItem={(job,index) => (
                    <List.Item>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3, delay: index * 0.2}}

                            style={{
                                cursor: "pointer",
                                borderRadius: "12px",
                                marginBottom: "8px",
                                transition: "background-color 0.3s ease", // Hiệu ứng mượt mà
                            }}
                        >
                            <JobCard job={job}/>
                        </motion.div>
                    </List.Item>
                )}
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