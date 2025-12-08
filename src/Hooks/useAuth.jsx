import {useContext} from 'react'
import {AuthContext} from "../Context/AuthContext.jsx";

const UseAuth = () => {
    return useContext(AuthContext);
}
export default UseAuth
