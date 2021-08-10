import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';

import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import useStyles from '../styles/classCardStyle';
import clsx from 'clsx';///< to merge styles

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from 'react-router-dom';

const ClassCard = ({item, handleDeleteClass}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);///< menu state
    const [openLeaveClass, setOpenLeaveClass] = useState(null);///< class leave dialog 

    const [expandedDescription, setExpandedDescription] = useState(false);

    const history = useHistory();

    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
      
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleGoToClass = () => {
      //go to class
      //localStorage.setItem("temp_class_id", item["id_class"]);
      const class_path ="/app/classes/" +  item["id_class"];
      history.push(class_path);

    };

    const handleLeaveClass = async () => {
      //open dialog for confirmation 
      const fetch_auth = async () => {
        const auth_fetch = await fetch(`http://192.168.206.129:5000/classes/authorization`,{
        method: 'POST',
        headers:{"Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")},
        body: JSON.stringify({"class_id":item["id_class"]})
        });
        const data = await auth_fetch.json();
        return data["token"];
    }
    const fetch_leave = async (token_class) => {
        const leave_fetch = await fetch(`http://192.168.206.129:5000/classes/leave_class`,{
        method: 'DELETE',
        headers:{"Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
                "x-auth-token-class": token_class},
        body: JSON.stringify({"class_id":item["id_class"]})
        });
        const data = await leave_fetch.json();
        if (data["code"] == 0){
          //send event up to parent component (posts page)
          handleDeleteClass(item["id_class"]);
        } else {
          alert("Error at leaving class");
        }
      }
      const x = await fetch_auth();
      fetch_leave(x);

      setOpenLeaveClass(false);
      handleCloseMenu();
    };

    return (
      item === undefined ?  
      <></>:
        <Grid item xs={4} md={4}>
        <Card className={classes.root}>
          <CardHeader
            action={
              <IconButton aria-label="settings" color="primary" onClick={handleClickMenu}>
                <MoreVertIcon />
              </IconButton>
            }
            title={`Class ${item["class_name"]}`}
            subheader={`Owner: ${item["owner_name"]}`}
            classes={{
              action: classes.action_btn,
              subheader: classes.subheader,
            }}
          />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
              <MenuItem onClick={()=>{handleCloseMenu(); handleGoToClass();}}>Go to Class</MenuItem>
              <MenuItem onClick={()=>setOpenLeaveClass(true)} style={{color:"red"}}>Leave Class</MenuItem>
      </Menu>

      <CardActions disableSpacing>

            <IconButton aria-label="add to favorites" onClick={handleGoToClass}>
              <ExitToAppIcon  color="primary"/>
            </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expandedDescription,
          })}
          onClick={()=>{setExpandedDescription(!expandedDescription)}}
          aria-expanded={expandedDescription}
          aria-label="show more"
        >
          <Tooltip title={<p style={{fontSize:12}}>Description of class</p>}>
          <ExpandMoreIcon color="primary"/>
          </Tooltip>
        </IconButton>
  
      </CardActions>

      <Collapse in={expandedDescription} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1" component="p">
              {item["class_description"] === "" ?  "Class has no description..." : item["class_description"]}
            </Typography>
          </CardContent>
      </Collapse>



        {/* Dialog for joining a class */}
              <Dialog
              open={openLeaveClass}
              onClose={()=>{setOpenLeaveClass(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to leave this class?"}</DialogTitle>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                  <Button onClick={()=>{setOpenLeaveClass(false)}} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleLeaveClass} color="primary">
                      <b>Leave</b>
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}  
        </Card>

        </Grid>
      );
}

export default ClassCard
