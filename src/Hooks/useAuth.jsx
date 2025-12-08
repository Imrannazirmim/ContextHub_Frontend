import {useContext} from 'react'
import {AuthContext} from "../Context/AuthContext.jsx";

const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth
