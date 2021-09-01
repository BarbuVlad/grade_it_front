import { Divider, Grid, List, TextField, Typography, Button } from "@material-ui/core"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton";
import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "../../styles/membersStyle"
const Members = () => {
    const classes = useStyles();

    const [members, setMembers] = useState([]);
    const [refresh, setRefresh] = useState(1);

    const [openInviteStudent, setOpenInviteStudent] = useState(false);
    const [openInviteTeacher, setOpenInviteTeacher] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarStatus, setSnackbarStatus] = useState(0);//code 0 - success; not 0 - fail

    const [sending, setSending] = useState(false);

    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetch_members = async () =>{
            try{
              const members_fetch = await fetch(`http://192.168.206.129:5000/classes/members?sort=true`, {
                method: 'GET',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                            "x-auth-token-class": localStorage.getItem("token_class")
                            }
            });//
            const data = await members_fetch.json(); 
            console.log(data);
            if(data["code"]==0){
                setMembers(data["members"]);
                return;
            }
            if(data["code"]==1){///< auth fail
                setMembers(1);
                return;
            }
            if(data["code"]==2){// Empty list
                setMembers(1);
                return;
            }
            } catch(err){
                alert("Can't fetch members. Network error!");
            }
        }

        fetch_members();
    },[refresh])

    const doRefresh = () =>{
        setRefresh(refresh+1);
    }

    const handleSendInvite = async (email) => {
        setSending(true);
        try{
            const invite_fetch = await fetch(`http://192.168.206.129:5000/emailService/sendInvite`, {
                method: 'POST',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                            "x-auth-token-class": localStorage.getItem("token_class")
                            },
                body: JSON.stringify({"email":email})
            });//
            const data = await invite_fetch.json(); 
            console.log("invite: ",data);
            if(data["code"]==0){
                setSnackbarStatus(0);
                setSnackbarText(data["message"]);
                setOpenSnackbar(true);
                //return;
            } else{
                setSnackbarStatus(1);
                setSnackbarText(data["message"]);
                setOpenSnackbar(true);
            }
            } catch(err){
                setSnackbarStatus(2);
                setSnackbarText("Network error. Can't send");
                setOpenSnackbar(true);
            }


        setSending(false);
    }
    return (
        <Grid
        container
        className={classes.root}
        spacing={8}
        >
            <Grid item sm={12} md={6} style={{ borderRightStyle:"outset", borderWidth:"1px", borderColor:"grey"}}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
                    <Typography variant="h4" >
                        Students
                    </Typography>
                    
                    { localStorage.getItem("role") === "teacher" || localStorage.getItem("role")==="owner"?
                    <IconButton color="primary" onClick={()=>{setOpenInviteStudent(true)}}>
                        <PersonAddIcon />
                    </IconButton>
                    :
                    <></>
                    }

                </div>
            <List>
            { members.map( (member) => (
                member.role==="student" ? 
                <MemberCard item={member} handleRefresh={doRefresh} key={member["id"]}/>

                :
                <></>

            ))}
            </List>

            </Grid>


            <Grid item xs={12} sm={6} >
                <div style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
                <Typography variant="h4" className={classes.titles}>
                    Teachers
                </Typography>
                { localStorage.getItem("role")==="owner" ?
                    <IconButton color="primary" onClick={()=>{setOpenInviteTeacher(true)}}>
                        <PersonAddIcon />
                    </IconButton>
                :
                <></>
                }
                </div>
                <List>
                { members.map( (member) => (
                    member.role!=="student" ? 
                    <MemberCard item={member} handleRefresh={doRefresh} key={member["id"]}/>

                    :
                    <></>

                ))}
                </List>
            </Grid>

            {/* Dialog for invite teacher */}
            <Dialog
              open={openInviteTeacher}
              onClose={()=>{setOpenInviteTeacher(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Invite teacher"}</DialogTitle>
              <DialogContent >
                  <Typography style={{textAlign:"left"}}>
                      Provide an email, a link will be sent to that address. 7 days untill expiration<br/>
                      <i style={{color:"grey"}}>
                      *The email must belong to an already existing account. 
                      Contact the person to create an account if she/he does not have one.
                      </i>
                  </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    fullWidth
                    error={false}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                      // OutlinedInputProps={{
                      //     classes:{
                      //         root: classes.cssFocused,
                      //     }
                      // }}
                />
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    <Button  
                    disabled={sending} 
                    color="primary"
                    onClick={()=>handleSendInvite(email)}
                    >
                      <b>Send</b>
                    </Button>
                    <Button 
                    disabled={sending}  
                    onClick={()=>{setOpenInviteTeacher(false)}} 
                    color="primary"
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </div>
              </div>
              { sending===true ? 
              <CircularProgress  size={34} className={classes.buttonProgress} />
                :<></>
                }
            </Dialog>
            {/* -------------------------- */}


            {/*Snackbar for class creation success / for join class success */}
            <Snackbar
              classes={{root:classes.snackbar_success}}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              open={openSnackbar}
              autoHideDuration={4500}
              onClose={()=>setOpenSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setOpenSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={snackbarStatus===0 ? "success" : "error"}
                onClose={()=>setOpenSnackbar(false)}>
                  {snackbarText}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}


        {/* Dialog for inviting a student */}
        <Dialog
              open={openInviteStudent}
              onClose={()=>{setOpenInviteStudent(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">
                {"Invite a student to class"}
                </DialogTitle>
              <DialogContent>
              <Typography style={{textAlign:"left"}}>
                      To invite a student he/she must create an account. Then join by typing the <u>class id</u> in the input textbox 
                      from left menu in <i>app/classes</i><br/><br/>
                      <div style={{color:"#ffc107", textAlign:"center"}}>
                        Class Id
                        <br />
                      </div>
                  </Typography >
                    
                  <Typography variant="h5" style={{color:"#ffc107", textAlign:"center"}}>
                    <b style={{fontSize:"5"}}>{localStorage.getItem("id_class")}</b>
                  </Typography>

              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                  <Button onClick={()=>{setOpenInviteStudent(false)}} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}  
        </Grid>
    )
}

export default Members
