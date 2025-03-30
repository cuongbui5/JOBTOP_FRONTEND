import {motion} from "framer-motion";
import SearchBar from "./SearchBar.jsx";

const SearchSection=()=> {
    return <div style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url('/images/hero-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            {/* Tiêu đề với hiệu ứng xuất hiện từ dưới lên */}
            <motion.p
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                style={{
                    color: "white",
                    maxWidth: "800px",
                    fontWeight: "bold",
                    fontSize: "40px",
                    padding: "10px 50px"
                }}
            >
                Tìm kiếm công việc yêu thích của bạn một cách dễ dàng.
            </motion.p>

            {/* Mô tả với hiệu ứng mờ dần */}


            {/* Button với hiệu ứng nhấp nháy nhẹ */}
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8, delay: 0.6, ease: "easeOut"}}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginLeft: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",

                }}
            >
               <SearchBar/>
            </motion.div>
        </div>
    </div>
}

export default SearchSection;