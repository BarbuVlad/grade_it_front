import Button from  '@material-ui/core/Button';
import Container from  '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Link from '@material-ui/core/Link';

import { useState } from "react";

import { useHistory } from 'react-router-dom';

import useStyles from '../styles';

const Register = () => {
    const history = useHistory();

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
    const [openRegister, setOpenRegister] = useState(false);

    const classes = useStyles();
    
    /*Handlers */

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

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
                alert("Password must be the same");
                //setOpenRegister(true);
                return;
            }
            console.log(email, password);
          //history.push('/login');
          //fetch login from server
          try{
            const register_result = await fetch('http://192.168.206.129:5000/users', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({email, password})
            });
            const data = await register_result.json();
            //see server docs for info about this request
            if(data["code"]==-1){ //error occured on server (unknown)
                setRegisterFail(true);
                setPopupText("Error occured on server, please try again!");
                setPopupTitle("Error");
                setOpenRegister(true);
                return;
            }
            if(data["code"]==0){//success
                setRegisterFail(false);
                setPopupText(`You have been registered!`);
                setPopupTitle("Success");
                setOpenRegister(true);
                return;
            }

            if(data["code"]==1 || data["code"]==2 || data["code"]==4){ //validation error or other error
                setRegisterFail(true);
                setPopupText(data["message"]);
                setPopupTitle("Error");
                setOpenRegister(true);
                return;
            }

            if(data["code"]==3){//user exists
                setRegisterFail(true);
                setPopupText("A user has already been registered with this email");
                setPopupTitle("Error");
                setOpenRegister(true);
                return;
            }
        }catch(err){
             // unkwown error (500?)
                setRegisterFail(true);
                setPopupText(`Registration faied (server or network error)
                    ${err}`);
                setPopupTitle("Error");
                setOpenRegister(true);
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
            label="email"
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
        <Button 
            className={classes.btn}
            type="submit"
            color="primary"
            variant="contained"
        > 
            Register
        </Button>
                    {/* ==== Register result dialog ===*/}
                    <Dialog
              open={openRegister}
              onClose={handleCloseRegister}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            
              <div style={{backgroundColor:"#3d3d3d", color: registerFail?"#d45559":"#9bdb5a", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
              <DialogContent style={{color:"white"}}>
                  {popupText}   
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
                  <DialogActions>
                    <Button onClick={handleCloseRegister} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* ==== -------------------- ===*/}
        

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
export default Register;