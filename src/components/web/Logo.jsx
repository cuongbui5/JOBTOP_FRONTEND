import {Link} from "react-router-dom";

const Logo=({size})=>{
    return <Link to={"/"} style={{
        fontSize: size,
        fontWeight: "bold",
        color: "#00afc1",
    }}>
        JOB<span style={{color: "#4a5f75"}}>TOP</span>
    </Link>
}

export default Logo;