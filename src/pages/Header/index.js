import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";

const Header = (props) => {

    const context = useContext(AuthContext);
    return (
        <AppBar component="nav">
            {context.isLoggedIn ? <Toolbar><Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                Welcome {localStorage.getItem("loggedInUserEmail")}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button variant="outline" onClick={context.onLogOut}>Logout</Button>
            </Box></Toolbar>: ''}
      </AppBar>
    );
};

export default Header;