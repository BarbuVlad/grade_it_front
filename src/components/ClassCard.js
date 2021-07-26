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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import useStyles from '../styles/classCardStyle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ClassCard = ({item}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);///< menu state
    const [openLeaveClass, setOpenLeaveClass] = useState(null);///< class leave dialog 


    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
      
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleGoToClass = () => {
      //go to class

    };

    const handleLeaveClass = () => {
      //open dialog for confirmation 
      
      setOpenLeaveClass(false);
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
              <MenuItem onClick={handleCloseMenu}>Go to Class</MenuItem>
              <MenuItem onClick={()=>setOpenLeaveClass(true)} style={{color:"red"}}>Leave Class</MenuItem>
      </Menu>

          <CardContent>
            <Typography variant="body1" component="p">
              {item["description"] === "" ? item["description"] : "Class has no description..."}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>

            <IconButton aria-label="add to favorites">
              <ExitToAppIcon  color="primary"/>
            </IconButton>
  
          </CardActions>

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
