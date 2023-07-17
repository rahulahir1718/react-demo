import { Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react"

const AuthContext  = React.createContext({
    isLoggedIn : false,
    onLogOut: () => {},
    onLogin: (userName) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, SetIsLoggedIn] = useState(null);

    const logOuthandler = ()  => {
        localStorage.clear();
        SetIsLoggedIn(false);
    };

    const loginHandler = (userName) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem("loggedInUserEmail", userName);
        SetIsLoggedIn(true);
    };

    useEffect(()=>{
        let val = localStorage.getItem('isLoggedIn');

        if(val === '1')
            SetIsLoggedIn(true);
    }, []);

    return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogOut: logOuthandler}}>
        {props.children}
    </AuthContext.Provider>
    );
}

export default AuthContext;