import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logoNew.png';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }))(Badge);


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
        /*if(token){
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {  //Checks if token has expired
                logout();
            }

        }*/

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    console.log(user);
    const Admin = user?.result?.admin;


    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        
        history.push('/');

        setUser(null);
    }
    return(
    <AppBar className = {classes.appBar} position = "static" color = "inherit">
        <div className={classes.brandContainer}>
        <img className = {classes.image} src={logo} alt = "logo" height = "60"/>
        <Typography component={Link} to='/'className = {classes.heading} variant = "h2" align ="center" > Post-It.io </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
        {user ? (<div className = {classes.profile}> 
            <StyledBadge overlap="circle" anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}variant="dot">
            <Avatar className = {classes.purple} alt= {user.result.name} src = {user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
            </StyledBadge>
            <Typography className = {classes.userName} variant="h6" > {user.result.name} </Typography>
            <Button variant="contained" className = {classes.logout} color = "secondary" onClick={logout}> Log Out </Button>
        </div>) : (
            <Button className = {classes.signinButton} component={Link} to = "/auth" variant = "contained" color = "primary">Sign In</Button>
        )}
        { Admin  && (<div className = {classes.dashB}>
            <Button className = {classes.dashboardButton} component={Link} to = "/Dashboard"> Dashboard</Button>
            </div>
        )}
        </Toolbar>
    </AppBar>


)};

export default Navbar;