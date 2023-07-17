import { Box, Typography, TextField, Button } from "@mui/material";
import Classes from '../../Invalid.module.css';
import { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../../Store/auth-context";
import useInput from "../../hooks/use-input";

const Login = (props) => {

    const context = useContext(AuthContext);

    const 
    { 
        value: emailValue, 
        isValid:emailIsValid, 
        onFieldChange: onUserNameChange, 
        onInvalidSubmit: onInvalidEmailSubmit 
    } = useInput(value => value.includes('@'));

    const 
    { 
        value: passwordValue, 
        isValid:passwordIsValid, 
        onFieldChange: onPasswordChange, 
        onInvalidSubmit: onInvalidPasswordSubmit 
    } = useInput(value => value.length >= 8 && value.length <= 14);


    const handleSubmit = (event) => {
        event.preventDefault();
       
        if(emailIsValid === false || passwordIsValid === false)
            return;

        if(emailValue.length == 0 || passwordValue.length == 0){
            if(emailValue.length == 0){
                onInvalidEmailSubmit();
            } 
            
            if(passwordValue.length == 0){
                onInvalidPasswordSubmit();
            }

            return;
        }    

        context.onLogin(emailValue);
    };

    return (
       <Box display="flex" justifyContent="center" mt={20}>
            <Box display="flex" flexDirection="column" className="login-card">
                <Typography variant="h4">
                    Login
                </Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                        id="email" 
                        error = {emailIsValid === false ? true : false}
                        className={Classes.textField}
                        label="Email" 
                        variant="outlined" 
                        onChange={onUserNameChange} 
                        value={emailValue}
                        helperText = {emailIsValid === false ? "Please enter a valid email address" : ""}
                        />
                        <TextField 
                        id="password"
                        type="password" 
                        error = {passwordIsValid === false ? true : false}
                        className={Classes.textField}
                        label="Password" 
                        variant="outlined" 
                        onChange={onPasswordChange} 
                        value={passwordValue}
                        helperText = {passwordIsValid === false ? "Password length should be between 8 to 14" : ""}
                        />
                        <Button type="submit" variant="outlined">Login</Button>
                    </form>
                </Box>
            </Box>
       </Box>
    );
};

export default Login;