
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
import PostAddIcon from '@material-ui/icons/PostAdd';
import RefreshIcon from '@material-ui/icons/Refresh';

import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';

import useStyles from '../styles/layoutStyles';
import {appBarHeight} from '../styles/layoutStyles';

const ClassesDrawer = ({handleRefresh}) => {
    const classes = useStyles();

    const [openCreatePost, setOpenCreatePost] = useState(false);

    const [postTitle, setPostTitle] = useState('');
    const [postTitleError, setPostTitleError] = useState(false);

    const [postBody, setPostBody] = useState('');
    const [postBodyError, setPostBodyError] = useState(false);
    
    // const [classDescriptionError, setClassDescriptionError] = useState(false);



    const [createPostLoading, setCreatePostLoading] = useState(false);

    const [postActionSnackbar, setPostActionSnackbar] = useState(false);
    const [postTextSnackbar, setPostTextSnackbar] = useState('');
    const [postSuccessSnackbar, setPostSuccessSnackbar] = useState(false);

    const [classId, setClassId] = useState();
    //const [refreshCounter, setRefreshCounter] = useState(0);

    const menuActions = [
        {
            text: "Add post",
            icon: <PostAddIcon color="primary" />,
            action: ()=>{setOpenCreatePost(true);setPostTitleError(false);setPostBodyError(false)}
        },
        {
            text: "Refresh",
            icon: <RefreshIcon color="primary" />,
            action: ()=>{handleRefresh()}///< lifting up state
            
        }
    ]

    const handleCreatePost = () => {
      setPostTitleError(false);
      setPostBodyError(false);
      if(postTitle.replace(' ', '') === ''){
        setPostTitleError(true);
        return;
      }
      if(postBody.replace(' ', '') === ''){
        setPostBodyError(true);
        return;
      }

      const fetch_create_post = async() => {
        setCreatePostLoading(true);
        const create_result = await fetch('http://192.168.206.129:5000/classes/create_post?anonymity=false', {
          method: 'POST',
          headers: {"Content-type": "application/json", 
          "x-auth-token":localStorage.getItem("token"),
          "x-auth-token-class": localStorage.getItem("token_class")
        },
          body: JSON.stringify({"title":postTitle, "body":postBody})
      });
      const data = await create_result.json();

      if(data["code"]==0){//successfull operation
        setPostTextSnackbar(`Post created successfully!`);
        setPostActionSnackbar(true);
        setPostSuccessSnackbar(true);

        setOpenCreatePost(false);
      }
      else if(data["code"]==1){//bad class name
        setPostTextSnackbar(`Post NOT created (bad class name)`);
        setPostActionSnackbar(true);
        setPostSuccessSnackbar(false);

      }
      else if(data["code"]==2){//bad user id
        setPostTextSnackbar(`Post NOT created (bad user id)`);
        setPostActionSnackbar(true);
        setPostSuccessSnackbar(false);

      }
      else{//error (includes data["code"] = 3)
        setPostTextSnackbar(`Post NOT created (server error)`);
        setPostActionSnackbar(true);
        setPostSuccessSnackbar(false);
      }
        setCreatePostLoading(false);
      }
      
      fetch_create_post();
      handleRefresh();///< lifting up state

    }


    return (
        <>
            {/*drawer on the right side */}
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                //overrides the defailt elements inside
                classes={{ paper:classes.drawer_plus}}
            >
           

            <Divider style={{marginTop:appBarHeight/4, paddingBottom:45}}/>
            {/*List of menu items */}
            <List style={{display:"row-reverse"}}>
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

            {/* Dialog for creating a class */}
            <Dialog
              open={openCreatePost}
              onClose={()=>{
                setOpenCreatePost(false);
                setPostTitle('');
                setPostBody('');}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.slide}
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Create a new post"}</DialogTitle>
              <DialogContent >
                <TextField
                    margin="dense"
                    label="Title"
                    placeholder="max.50 chars"
                    fullWidth
                    error={postTitleError}
                    onChange={(e) => setPostTitle(e.target.value)}
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
                    label="Body"
                    placeholder="max.2000 chars"
                    fullWidth
                    multiline
                    rowsMax={6}
                    error={postBodyError}
                    onChange={(e) => setPostBody(e.target.value)}
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
                    
                    <div>
                      <Button onClick={handleCreatePost} 
                      color="primary" 
                      disabled={createPostLoading}
                      className={classes.dialog_button}>
                        <b> {"Create"}</b>
                      </Button>
                      {createPostLoading && <CircularProgress size={34} className={classes.buttonProgress} />}
                    </div>

                    <Button 
                    onClick={()=>{
                      setOpenCreatePost(false);
                      setPostTitle('');
                      setPostBody(''); }} 
                    color="primary"
                    disabled={createPostLoading}
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
                vertical: 'center',
                horizontal: 'center',
              }}
              open={postActionSnackbar}
              autoHideDuration={4500}
              onClose={()=>setPostActionSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setPostActionSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={postSuccessSnackbar ? "success" : "error"}
                onClose={()=>setPostActionSnackbar(false)}>
                  {postTextSnackbar}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}
        </>
    )
}

export default ClassesDrawer
