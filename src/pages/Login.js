import Button from  '@material-ui/core/Button';
import Container from  '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core';

import { useState } from "react";

import { useHistory } from 'react-router-dom';

import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { setJwt } from "../redux/jwtSlice";

const Login = () => {
    //states and variabiles
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    //redux states
    const jwt = useSelector((state)=>state.jwt);
    const dispatch = useDispatch();

    const history = useHistory();
    const classes = useStyles();

    //handlers
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        if (email === '') {setEmailError(true)}
        if (password === '') {setPasswordError(true)}
        //validate
        if(email && password) {
            console.log(email, password);
            //fetch login from server
            
            const login_result  = await   fetch('http://192.168.206.129:5000/users/login', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, password})
            });

            const data = await login_result.json();
            console.log(data);
            
            if(data["code"]=="201"){
                //login successfull
                await dispatch(setJwt(data));
                console.log(jwt);
                alert("Login successfull.");
                history.push('app/home');
            }
            else{
                setEmailError(true);
                setPasswordError(true);
                alert("Login failed! Wrong email or password");

            }
        }

    }
    return (
    <Grid container style={{display: "flex", justifyContent: "center"}}>
    <Grid item xs={6} xl={6} className={classes.container}>
        
            <Typography variant="h4" className={classes.text}>
                Welcome back!
            </Typography>
            <Typography variant="h6" className={classes.text_second}>
                Login and let's get started.
            </Typography>

        <form noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
            <TextField 
            onChange={(e) => setEmail(e.target.value)}
            className={classes.field}
            label="EMAIL"
            variant="outlined"
            fullWidth
            required
            
            error={emailError}
            />

            <TextField 
            onChange={(e) => setPassword(e.target.value)}
            className={classes.field}
            label="PASSWORD"
            type="password"
            variant="outlined"
            fullWidth
            required

            error={passwordError}
            />

            <Button 
                className={classes.btn}
                type="submit"
                color="primary"
                variant="contained"
            > 
                Login
            </Button>
        </form>

        
        </Grid> {/*grid item 1 - login page */ }

        <Grid item xs={3} xl={3} className={classes.container_create_account}>
            
            <Typography variant="h5" className={classes.text_account}>
                Create an account
            </Typography>

            <div>
                <AccountBoxIcon color="primary" style={{ fontSize: 65, marginTop: 64 }}/>
                <Typography className={classes.root}>
                        <Link href="/register" onClick={console.log("")}>
                            Register here!
                        </Link>
                </Typography>
            </div>
            
        </Grid>

        </Grid> //grid container
    )
}

export default Login;
