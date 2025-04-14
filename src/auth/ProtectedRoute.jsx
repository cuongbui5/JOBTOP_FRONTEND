import {Navigate, Outlet} from "react-router-dom";
import {getStoredUser} from "../utils/helper.js";




// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({  requiredRole  }) => {
    const user=getStoredUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && requiredRole !== user?.role) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet/> ;
};

export default ProtectedRoute;