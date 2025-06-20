import { getJWT } from "./localstorage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const token = getJWT();

    return token ? element : <Navigate to="/bancalinea/login" />;
};

export default PrivateRoute;