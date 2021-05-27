import React, {useState}  from'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import {useDispatch} from 'react-redux';
import { useHistory} from 'react-router-dom';
import { signin, signup } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password:'', confirmPassword: ''};

export const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData);
        
        if(isSignup){
            dispatch(signup(formData, history)); //Pass form data and history object to navigate after submit
            
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value}) //Sets data accortding to current input
    };

    const switchMode = () => {
        setisSignup((previsSignup) => !previsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        //console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch( {type: 'AUTH', data: {result, token }} );
            history.push('/');  // Redicts to homepage after login
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign in failed. Try again ");
    };

    return (
        <Container component="main" maxWidth = "xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing = {2}>
                        {
                            isSignup && (
                                <>
                                    <Input name = "firstName" label = "First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name = "lastName" label = "Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name = "email" label= "Email" handleChange={handleChange} type = "email"/>
                        <Input name = "password" label= "Password" handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label = "Confirm Password" handleChange={handleChange} type= "password"/>}
                    </Grid>
                    <Button type ="submit" fullWidth variant="contained" color = "primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="461483645259-gtbgfn428ejtv6s791hmte7lbr1676og.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color = 'primary' fullWidth onClick={renderProps.onClick} disable ={renderProps.disabled} startIcon={<Icon/>} variant = "contained">{isSignup ? 'Sign up with Google' :'Sign in with Google' }</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify ="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> {isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up' } </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;