import { Divider, Typography, Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from "../styles/postStyles";
import { useState } from "react";
import jwtDecode from "jwt-decode";

const Post = ({post, inClassPost, handleRefresh}) => {
    const classes = useStyles();
    const [deletePostDialog, setDeletePostDialog] = useState(false);
    const [deletePostDialogTitle, setDeletePostDialogTitle] = useState('');
    const [deletePostDialogText, setDeletePostDialogText] = useState('');

    const handleDeletePost = async () => {
        const fetch_delete = await fetch(`http://192.168.206.129:5000/classes/delete_post`,{
            method: 'DELETE',
            headers:{"Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                    "x-auth-token-class": localStorage.getItem("token_class")},
            body: JSON.stringify({"date_time":post.date_time})
            });
            const data = await fetch_delete.json();
            if(data["code"]==0){
                setDeletePostDialog(true);
                setDeletePostDialogTitle("Success");
                setDeletePostDialogText("Post was deleted");
            } else{
                setDeletePostDialog(true);
                setDeletePostDialogTitle("Error");
                setDeletePostDialogText("Post was NOT deleted. Error occurred");
            }

    }
    
    return (
        <>
        <ListItem
        divider
        className={classes.list_item}
        >   
            <Card className={classes.root} variant="outlined">
             <CardContent>

                <div className={classes.header}>
                    <Typography variant="body1" className={classes.header_class}>{post.title}</Typography>
                    <Divider orientation="vertical" flexItem />

                    <Typography variant="body1" className={classes.header_date}>{post.date_time}</Typography>
                    <Divider orientation="vertical" flexItem/>

                    <Typography variant="body1" className={classes.header_username}>{post.author}</Typography>
                    {   inClassPost === true && 
                    (localStorage.getItem("role") === "owner" 
                    || localStorage.getItem("role") === "teacher"
                    || jwtDecode(localStorage.getItem("token_class"))["id_user"] == post.author_id) ? //More options are available
                        <IconButton aria-label="delete" style={{color:"#8c8282"}} size="small" onClick={handleDeletePost}>
                              <DeleteIcon />
                        </IconButton>
                        :
                        <></>

                    }
                </div>

                <Divider className={classes.divider}/>

                <Typography variant="body1">
                    { post.body.replaceAll(' ', '') === "" ? 
                    "Post body is empty..."
                    :
                    post.body
                    
                }
                </Typography>

             </CardContent>
            </Card>
        </ListItem>

            {/* Dialog for deleting a post */}
            <Dialog
              open={deletePostDialog}
              onClose={()=>{
                setDeletePostDialog(false);
                setDeletePostDialogTitle('');
                setDeletePostDialogText('');
                handleRefresh();}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.slide}
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{deletePostDialogTitle}</DialogTitle>
              <DialogContent >
                <Typography variant="h5" > {deletePostDialogText} </Typography>
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                      <Button                     
                      onClick={()=>{
                        setDeletePostDialog(false);
                        setDeletePostDialogTitle('');
                        setDeletePostDialogText('');
                        handleRefresh();}}
                      color="primary" 
                      className={classes.dialog_button}>
                        <b> {"OK"}</b>
                      </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}
        </>
    )
}

export default Post
