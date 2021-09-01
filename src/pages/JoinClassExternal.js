import {  Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import React, { useEffect, useState } from 'react'
import {Route,  useRouteMatch, useHistory, useParams} from 'react-router-dom';
import jwtDecode from "jwt-decode";

const JoinClassExternal = () => {
    let { token } = useParams();
    let { path } = useRouteMatch();
    const history = useHistory();

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("Successfull validation");
    const [dialogBody, setDialogBody] = useState(0);
    const [isUserLogged, SetIsUserLogged] = useState(false);
    //let isUserLogged;

    const handleCloseDialog = () => {
        /*Will redirect to either login of home page */
        if(dialogBody === 0 && isUserLogged){
            history.push("/app/home");//home
            return;
        }
        history.push("/");//login
    }
    useEffect(() => {
        //Step 1: read token, validate, put in ls
        let token_decoded;
        try{
             token_decoded = jwtDecode(token);
        } catch(err){
            setDialogTitle("Error");
            setDialogBody(1);//1 = invalid token
            setOpenDialog(true);
            return;
        }

        let token_date = new Date(token_decoded["iat"] * 1000);
        let today = new Date();
        const diffTime = Math.abs(today - token_date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays>7){
            setDialogTitle("Error");
            setDialogBody(2);//2 = invitation is older than 7 days error
            setOpenDialog(true);
            return;
        }
        localStorage.setItem("invite_token", token);

        //Step 2: check aplication access token (is user logged in?)
        SetIsUserLogged(false);
        const app_token = localStorage.getItem("token");
        try{
            token_decoded = jwtDecode(app_token);
            if(app_token["id"] !== token_decoded["id_user"]){
                SetIsUserLogged(false);
            } else {
                SetIsUserLogged(true);
            }
         } catch(err){}

        //Step 3: open dialog window at redirect to either login page or home page
        setOpenDialog(true);
        return;
        //Step 4: in home page...


    },[])
    return (
        <>

        <Backdrop style={{color: '#fff'}} open={!openDialog}>
        <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent >
              <DialogContentText id="alert-dialog-description" style={{color:"white"}}>
                    {dialogBody === 0 ? 
                        <>
                            <p>Invitation is <i>valid</i></p>
                            {isUserLogged ? <p>You will be redirected to home page to accept invitation</p> 
                            : 
                            <p>Log in to accept invitation. You will be redirected.</p>}
                        </>  
                    : <></>}

                    {dialogBody === 1 ? 
                        <>
                            <p>Invitation token is <i>invalid</i></p>
                            <p>Contact class owner for new invitation link</p> 

                        </>  
                    : <></>}

                    {dialogBody === 2 ? 
                        <>
                            <p>Invitation token is <i>invalid</i></p>
                            <p>Token has <b>expired</b> (older than 7 days). Contact class owner to provide new link</p> 
                        </>  
                    : <></>}

              </DialogContentText>
        </DialogContent>
          <div style={{display:"flex", justifyContent:"center"}}>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                {dialogBody === 0 && isUserLogged ? "Go to home page" : ""}
                {dialogBody === 0 && !isUserLogged ? "Go to login page" : ""}
                {dialogBody !== 0 ? "ok" : ""}

              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>

    </>
    )
}

export default JoinClassExternal;
