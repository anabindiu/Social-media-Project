import React from "react";
import { Navigate} from "react-router-dom";
export const ProtectedRoute = ({
    redirectPath = '/welcome',
    children,
}) => {
    if(localStorage.getItem("user") == null){
        return <Navigate to = {redirectPath} replace />;
    }
    else{
        return children;
    }
};