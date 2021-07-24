
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useState } from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupIcon from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory, useLocation} from 'react-router';
//import Link from "react-router-dom/Link";

import Divider from '@material-ui/core/Divider';

import useStyles from '../styles/layoutStyles';
import {appBarHeight} from '../styles/layoutStyles';

const ClassesDrawer = () => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const [openJoinClass, setOpenJoinClass] = useState(false);

    const [openCreateClass, setOpenCreateClass] = useState(false);

    const [className, setClassName] = useState('');
    const [classNameError, setClassNameError] = useState(false);

    const [classDescription, setClassDescription] = useState('');
    // const [classDescriptionError, setClassDescriptionError] = useState(false);

    const [classInvites, setClassInvites] = useState('');
    const [classInvitesError, setClassInvitesError] = useState(false);

    const [createClassLoading, setCreateClassLoading] = useState(false);

    const [classActionSnackbar, setClassActionSnackbar] = useState(false);///< for either join or create (show result)
    const [classTextSnackbar, setClassTextSnackbar] = useState('');
    const [classSuccessSnackbar, setClassSuccessSnackbar] = useState(false);

    const [classId, setClassId] = useState();

    const menuView = [
        {
            text: "Teaching",
            icon: <AssignmentIndIcon color="primary" />,
            path: '/app/classes/teacher'
        },
        {
            text: "Student",
            icon: <GroupIcon color="primary" />,
            path: '/app/classes/student'
        },

        {},
    ];

    const menuActions = [
        {
            text: "JoinClass",
            icon: <AddCircleOutlined color="primary" />,
            action: ()=>{setOpenJoinClass(true)}
        },
        {
            text: "CreateClass",
            icon: <AddBoxIcon color="primary" />,
            action: ()=>{setOpenCreateClass(true)}
            
        }
    ]

    const handleJoinClass = () => {
      const fetch_join_class = async() => {

          const join_result = await fetch('http://192.168.206.129:5000/classes/join', {
            method: 'POST',
            headers: {"Content-type": "application/json", "x-auth-token":localStorage.getItem("token")},
            body: JSON.stringify({"class_id":classId, "role":"student"})
        });
        const data = await join_result.json();

        if(data["code"]==0){//successfull operation
          setClassTextSnackbar(data["message"]);
          setClassActionSnackbar(true);
          setClassSuccessSnackbar(true);

        }
        else if(data["code"]==1){//bad class name
          setClassTextSnackbar(data["message"]);
          setClassActionSnackbar(true);
          setClassSuccessSnackbar(false);

        }
        else if(data["code"]==2){//bad class id
          setClassTextSnackbar(data["message"]);
          setClassActionSnackbar(true);
          setClassSuccessSnackbar(false);

        }
        else if(data["code"]==3){//registered already
          setClassTextSnackbar(data["message"]);
          setClassActionSnackbar(true);
          setClassSuccessSnackbar(false);

        }
        else{//error (includes data["code"] = 4)
          setClassTextSnackbar(data["message"]);
          setClassActionSnackbar(true);
          setClassSuccessSnackbar(false);
        }
      }
      
      fetch_join_class();
    }

    const handleCreateClass = () => {
      /* - Verify data integrity 
         - POST request
         - Get response
       */
      setClassNameError(false);
      // setClassDescriptionError(false);
      setClassInvitesError(false);
      if(className.replace(' ', '') === ''){
        setClassNameError(true);
        return;
      }
      //verify invites
      let _invites = classInvites.replaceAll(' ', '');
      if(_invites !== ''){
        _invites = _invites.split(";");
        for(let i=0; i<_invites.length-1; i++){
          if (!_invites[i].includes("@")){
            setClassInvitesError(true);
            return;
          }
        }
      }
      if(classDescription.replaceAll(' ', '')===''){setClassDescription('');}

      const fetch_create_class = async() => {
        setCreateClassLoading(true);
        const create_result = await fetch('http://192.168.206.129:5000/classes/create', {
          method: 'POST',
          headers: {"Content-type": "application/json", "x-auth-token":localStorage.getItem("token")},
          body: JSON.stringify({"name":className, "description":classDescription, "invites":_invites})
      });
      const data = await create_result.json();

      if(data["code"]==0){//successfull operation
        setClassTextSnackbar(`Class created successfully (id: ${data['classId']})`);
        setClassActionSnackbar(true);
        setClassSuccessSnackbar(true);

      }
      else if(data["code"]==1){//bad class name
        setClassTextSnackbar(`Class NOT created (bad class name)`);
        setClassActionSnackbar(true);
        setClassSuccessSnackbar(false);

      }
      else if(data["code"]==2){//bad user id
        setClassTextSnackbar(`Class NOT created (bad user id)`);
        setClassActionSnackbar(true);
        setClassSuccessSnackbar(false);

      }
      else{//error (includes data["code"] = 3)
        setClassTextSnackbar(`Class NOT created (server error)`);
        setClassActionSnackbar(true);
        setClassSuccessSnackbar(false);
      }
        setCreateClassLoading(false);
      }
      
      fetch_create_class();

    }
    const handleInvitesChange = (e) => {
      if(e.target.value[e.target.value.length-1] === '\n'){
        return;
      }
      if(e.target.value[e.target.value.length-1] === ' ' && e.target.value[e.target.value.length-2] !== ' '){
       // if(!classInvites.includes("@")){setclassInvitesError(true)}
        let x = classInvites;
        x = x.substring(0,x.length) + '; ';
        setClassInvites(x);
        return;
      }
      // if(e.target.value[e.target.value.length-1] === ';'){
      //   let x = classInvites;
      //   x = x.substring(0,x.length) + '; ';
      //   setClassInvites(x);
      //   return;
      // }
      setClassInvites(e.target.value);

    }

    

    return (
        <>
            {/*drawer on the left side */}
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                //overrides the defailt elements inside
                classes={{ paper:classes.drawer_plus}}
            >
            <div>
                <Typography
                variant="h5" style={{textAlign:"center", marginTop:appBarHeight/4}}>
                ----
                </Typography>
            </div>

            <Divider style={{marginTop:appBarHeight/4}}/>
            {/*List of menu items */}
            <List>
                {menuView.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={()=>history.push(item.path)}
                        className={location.pathname == item.path ?
                        classes.active : classes.inactive}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>
                    </ListItem>

                ))}

                {menuActions.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={item.action}
                        className={classes.inactive}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>
                </ListItem>

                ))}
            </List>

            </Drawer>

            {/* Dialog for joining a class */}
              <Dialog
              open={openJoinClass}
              onClose={()=>{setOpenJoinClass(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Write the id of the class you want to join"}</DialogTitle>
              <DialogContent >
                <TextField
                    autoFocus
                    margin="dense"
                    label="Id class"
                    fullWidth
                    error={false}
                    onChange={(e)=>setClassId(e.target.value)}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                      OutlinedInputProps={{
                          classes:{
                              root: classes.cssFocused,
                          }
                      }}
                />
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    <Button onClick={handleJoinClass} color="primary">
                      <b>Join</b>
                    </Button>
                    <Button onClick={()=>{setOpenJoinClass(false)}} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}


            {/* Dialog for creating a class */}
            <Dialog
              open={openCreateClass}
              onClose={()=>{
                setOpenCreateClass(false);
                setClassInvites('');
                setClassDescription('');
                setClassName('');}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.slide}
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Create a new class"}</DialogTitle>
              <DialogContent >
                <TextField
                    margin="dense"
                    label="Name"
                    placeholder="max.50 chars"
                    fullWidth
                    error={false}
                    onChange={(e) => setClassName(e.target.value)}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                      OutlinedInputProps={{
                          classes:{
                              root: classes.cssFocused,
                          }
                      }}
                />
                <TextField
                    margin="dense"
                    label="Desciption"
                    placeholder="max.255 chars"
                    fullWidth
                    multiline
                    rowsMax={6}
                    error={false}
                    onChange={(e) => setClassDescription(e.target.value)}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                      OutlinedInputProps={{
                          classes:{
                              root: classes.cssFocused,
                          }
                      }}
                />
                <Tooltip title={<p style={{fontSize:12}}>Write emails separated by semicolon</p>}>
                <TextField
                    margin="dense"
                    label="Invites"
                    fullWidth
                    multiline
                    rowsMax={3}
                    error={classInvitesError}
                    onChange={handleInvitesChange}
                    value={classInvites}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                      OutlinedInputProps={{
                          classes:{
                              root: classes.cssFocused,
                          }
                      }}
                />
                </Tooltip>
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    
                    <div>
                      <Button onClick={handleCreateClass} 
                      color="primary" 
                      disabled={createClassLoading}
                      className={classes.dialog_button}>
                        <b>{classInvites.replaceAll(' ','')==='' ? "Create" : "Create & send invites"}</b>
                      </Button>
                      {createClassLoading && <CircularProgress size={34} className={classes.buttonProgress} />}
                    </div>

                    <Button 
                    onClick={()=>{
                      setOpenCreateClass(false);
                      setClassInvites('');
                      setClassDescription('');
                      setClassName(''); }} 
                    color="primary"
                    disabled={createClassLoading}
                    className={classes.dialog_button}>
                      Cancel
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}

            {/*Snackbar for class creation success / for join class success */}
            <Snackbar
              classes={{root:classes.snackbar_success}}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={classActionSnackbar}
              autoHideDuration={6000}
              onClose={()=>setClassActionSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setClassActionSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={classSuccessSnackbar ? "success" : "error"}
                onClose={()=>setClassActionSnackbar(false)}>
                  {classTextSnackbar}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}
        </>
    )
}

export default ClassesDrawer
