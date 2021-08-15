import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

import useStyles from '../styles/memberCardStyle';
import clsx from 'clsx';///< to merge styles

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from 'react-router-dom';

const MemberCard = ({item, handleRefresh}) => {
    const classes = useStyles();
    const [openBlock, setOpenBlock] = useState(false);///< user block/unblock dialog 

    const [expandedActions, setExpandedActions] = useState(false);

    const history = useHistory();


    const handleBlockUser = async (action="block") => {
      //open dialog for confirmation 
    const fetch_block = async () => {
        const block_fetch = await fetch(`http://192.168.206.129:5000/classes/revoke_access?action=${action}`,{
        method: 'PATCH',
        headers:{"Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
                "x-auth-token-class": localStorage.getItem("token_class")},
        body: JSON.stringify({"user_id":item["id_user"]})
        });
        const data = await block_fetch.json();
        if (data["code"] == 0){
          //send event up to parent component (posts page)
          action === "block" ? item["blocked"] = 1 : item["blocked"] = 0;
          handleRefresh();
        } else {
          alert("Error at blocking user");
        }
      }
      fetch_block();
      setOpenBlock(false);
      //handleCloseMenu();
    };

    const handleConfirmUser = async (action="block") => {
      //open dialog for confirmation 
    const fetch_confirm = async () => {
        const confirm_fetch = await fetch(`http://192.168.206.129:5000/classes/confirm_user`,{
        method: 'PATCH',
        headers:{"Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
                "x-auth-token-class": localStorage.getItem("token_class")},
        body: JSON.stringify({"user_id":item["id_user"]})
        });
        const data = await confirm_fetch.json();
        if (data["code"] == 0){
          //send event up to parent component (members page)
          item["confirmed"] = 1;
          handleRefresh();
        } else {
          alert("Error at confirming user");
        }
      }
      fetch_confirm();
      //handleCloseMenu();
    };

    return (
      item === undefined ?  
      <></>:
        <Grid item xs={4} md={4}>
        <Card className={classes.root}>
        <CardActionArea onClick={()=>{if(item["role"]!=="owner")
        {setExpandedActions(!expandedActions)}}}>
        <CardContent>
            <Typography variant="h5" component="p">
              Email: {item["email"]}
              {/* Status: <ins>{item["role"]}</ins> */}
              
              {item["role"]==="owner" ? <b style={{color:"#ffc107"}}><br/>head teacher</b> : <></>}

              {item["confirmed"]===0 && item["role"]!=="student" ? <i style={{color:"#ef5350", fontSize:20}}><br/> needs confirmation</i> : <></>}
            </Typography>
          </CardContent>

  {item["role"]==="owner" || localStorage.getItem("role")==="student"? <></> : 
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expandedActions,
          })}
          onClick={()=>{setExpandedActions(!expandedActions)}}
          aria-expanded={expandedActions}
          aria-label="show more"
        >
          <Tooltip title={<p style={{fontSize:12}}>Block or confirm user</p>}>
          <ExpandMoreIcon color="primary"/>
          </Tooltip>
        </IconButton>
  
      </CardActions>
  }
      </CardActionArea>

{localStorage.getItem("role")==="student" ? <></> : 
      <Collapse in={expandedActions} timeout="auto" unmountOnExit>
          <Button disabled={item["confirmed"] === 1 ? true : false}
          color="primary" 
          size="large"
          onClick={handleConfirmUser}
          className={classes.button_action_confirm}>
              Confirm
           </Button>

          <Button 
          disabled={item["confirmed"] === 1 ? false : true} 
          color="secondary" 
          size="large"
          onClick={()=>{setOpenBlock(true)}}
          className={item["blocked"] === 1 ? classes.button_action_unblock : classes.button_action_block}>
              {item["blocked"] === 1 ? "Unblock" : "Block"}
        </Button>
      </Collapse>

}

        {/* Dialog for joining a class */}
              <Dialog
              open={openBlock}
              onClose={()=>{setOpenBlock(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">
                {item["blocked"] === 1 ?  "Unblock user from accessing class?" : "Block user from accessing class?"}

                </DialogTitle>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                  <Button onClick={()=>{setOpenBlock(false)}} color="primary">
                      Cancel
                    </Button>
                    <Button 
                    onClick={item["blocked"] === 1 ? 
                      ()=>{handleBlockUser("unblock")} 
                      : 
                      ()=>{handleBlockUser("block")}} 
                    color="primary">
                      {item["blocked"] === 1 ?  <b>Unblock</b> : <b>Block</b>}
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

export default MemberCard;
