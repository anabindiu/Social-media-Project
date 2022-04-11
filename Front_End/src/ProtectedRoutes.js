import React from "react";
import { Route, Navigate} from "react-router-dom";
import auth from "./auth/auth";
export const ProtectedRoute = ({
    redirectPath = '/welcome',
    children,
}) => {
    console.log(new Boolean(auth.isAuthenticated()));
    if(localStorage.getItem("user") == null){
        return <Navigate to = {redirectPath} replace />;
    }
    else{
        return children;
    }
};