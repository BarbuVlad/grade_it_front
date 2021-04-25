import Button from  '@material-ui/core/Button';
import Container from  '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


import Popup from 'reactjs-popup';
import PopupBox from '../popupBox';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { useState } from "react";

import { useHistory } from 'react-router-dom';

import useStyles from '../styles';

const Register = () => {

    //States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //Error states
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    //Other states
    const [registerFail, setRegisterFail] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [popupTitle, setPopupTitle] = useState(`Successfull`);

    const classes = useStyles();
    
    //Methods and handlers
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setRepeatPasswordError(false);
        if (email === '') {setEmailError(true)}
        if (password === '') {setPasswordError(true)}
        if (repeatPassword === '') {setRepeatPasswordError(true)}
        //validate
        
        if(email && password && repeatPassword) {
            if(password!==repeatPassword){
                setRepeatPasswordError(true);
                setRegisterFail(true);
                setPopupText("Incorect password");
                setPopupTitle("Error");
              //  alert("Password must be the same");
                return;
            }
            console.log(email, password);
          //history.push('/login');
          //fetch login from server
            const register_result = await fetch('http://192.168.206.129:5000/users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, password})
            });
            const data = await register_result.json();
            //see server docs for info about this request
            if(data["code"]==401){ //error occured on server (unknown)
                setRegisterFail(true);
                setPopupText("Error occured on server, please try again!");
                setPopupTitle("Error");
                return;
            }
            if(data["code"]==402){//user exists
                setRegisterFail(true);
                setPopupText("A user has already been registered with this email");
                setPopupTitle("Error");
                return;
            }
            if(data["code"]==201){//success
                setRegisterFail(false);
                setPopupText(`You have been registered! An email with the confirmation link was sent to ${email}`);
                setPopupTitle("Success");
                return;
            }

            if(data["code"]==403){ //validation error
                setRegisterFail(true);
                setPopupText(data["message"]);
                setPopupTitle("Error");
                return;
            }
            else{ // unkwown error (500?)
                setRegisterFail(true);
                setPopupText("Registration faied!");
                setPopupTitle("Error");
                return;
            }


            //alert("Account created successfully. Go to login");
        }
    }

    return (
    <Container maxWidth="md" className={classes.container_register}>
        <Typography variant="h4" className={classes.text}>
            Create an account
        </Typography>



        <form noValidate autoComplete="off" onSubmit={handleRegisterSubmit}>
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

        <TextField 
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={classes.field}
            label="REPEAT PASSWORD"
            type="password"
            variant="outlined"
            fullWidth
            required

             error={repeatPasswordError}
            />

        <div>
        <PopupBox

        isError={(repeatPasswordError || passwordError || emailError || registerFail)}
        title={popupTitle}
        body={popupText}
        trigger_function={<Button 
            className={classes.btn}
            type="submit"
            color="primary"
            variant="contained"
        > 
            Register
        </Button>}
        ></PopupBox>

        </div>
        </form>
        
        
        <Typography style={{marginTop: 20}}>
                        Already have an account? 
                        <Link 
                        style={{fontWeight:"bold", marginLeft:5}}
                        href="/" 
                        onClick={console.log("Login")}>
                            Login here.
                        </Link>
                </Typography>
    </Container>

    )
}
//{((repeatPasswordError && passwordError && emailError) || registerClicked) ? <div> <PopupBox open_bool={registerClicked}/> </div>:<div>He</div> }
// {(repeatPasswordError && passwordError && emailError) || registerClicked ? <div>He</div> : <PopupBox className={classes.popup_box} open_bool={true}/>}
export default Register;

            /*
                fetch('http://192.168.206.129:5000/users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, password})
            }).then((res) => {alert("Account created successfully. Go to login");
                                console.log(res)}) //history.push('/')
            
            */