import React from "react";
import { useNavigate } from "react-router";

const AuthButtons = ({onClose}) => {
    const navigate = useNavigate();

    const handleNavigate = (path)=>{
        navigate(path);
        if(onClose)onClose()
    }
    return (
        <>
            <button  onClick={()=>handleNavigate('/auth/register')} className="btn btn-soft btn-info">Register</button>
            <button onClick={()=>handleNavigate('/auth/login')} className="btn btn-soft btn-success">Login</button>
        </>
    );
};

export default AuthButtons;
