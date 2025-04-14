import {useMediaQuery} from "react-responsive";

// eslint-disable-next-line react/prop-types
const ResponsiveContainer=({children})=>{
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    let padding;
    if (isMobile) padding = '16px';
    else if (isTablet) padding = '24px 60px';
    else if (isDesktop) padding = '24px 100px';
    return (<div style={{maxWidth: "100%", height: "100%", margin: "auto", backgroundColor: "#fff",padding:padding}}>{children}</div>)

}
export default ResponsiveContainer;