import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logo.png';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    //const user = null;  //Mock user
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));  // fetch user from local storage
    
    useEffect(() => {
        const token = user?.token;  //If the user exists, send its token to token variable
        
        // Falta arreglar bug que si haces rerfresh te saca
        if(token){
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {  //Checks if token has expired
                logout();
            }

        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        
        history.push('/');

        setUser(null);
    }
    return(
    <AppBar className = {classes.appBar} position = "static" color = "inherit">
        <div className={classes.brandContainer}>
        <Typography component={Link} to='/'className = {classes.heading} variant = "h2" align ="center" > Red Social </Typography>
        <img className = {classes.image} src={logo} alt = "logo" height = "60"/>
        </div>
        <Toolbar className={classes.toolbar}>
        {user ? (<div className = {classes.profile}> 
            <Avatar className = {classes.purple} alt= {user.result.name} src = {user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
            <Typography className = {classes.userName} variant="h6" > {user.result.name} </Typography>
            <Button variant="contained" className = {classes.logout} color = "secondary" onClick={logout}> Log Out </Button>
        </div>) : (
            <Button className = {classes.signinButton} component={Link} to = "/auth" variant = "contained" color = "primary">Sign In</Button>
        )}
        </Toolbar>
    </AppBar>


)};

export default Navbar;