import {useEffect} from 'react'
import {useAuth} from "../../Context/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate]);


    return isAuthenticated ? children : null;
}

export default ProtectedRoutes
