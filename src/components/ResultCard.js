import { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '../styles/testCardStyles';///< same styles as member in general
import clsx from 'clsx';///< to merge styles

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { useHistory,useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress, DialogContent, TextField } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { TodayOutlined } from '@material-ui/icons';
const CssTextField = withStyles({
    root: {
        // '& label.Mui-focused': {
        //   color: 'grey',
        // },
        // '& .MuiInput-underline': {
        //   borderBottomColor: 'grey',
        // },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'grey',
            fontSize:20
          },
          '&:hover fieldset': {
            borderColor: '#ffc107',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffb300',
          },
        },
      },
})(TextField)

const ResultCard = ({item}) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const handleViewResults = () => {

        //history.push(location.pathname+`/view_single/${item["id_test"]}`);
        localStorage.setItem("id_user_to_view",item["id_user"]);
        const loc = location.pathname.replace("view_all","view_single");
        history.push(loc);
    }


    return (
        <Card className={classes.root}>
        <CardContent className={classes.cardText}>
            <Typography variant="h6" align="left">
              Owner: <b>{item["email"]}</b>
            </Typography>
            <br />
            <Typography style={{marginLeft:15}}component="p">Time: <b>{item["date_time"]}</b></Typography>

          </CardContent>

<div style={{display:"flex", flexDirection:"row",alignItems:"flex-end", justifyContent:"flex-end"}}>
          <Tooltip title={<p style={{fontSize:12}}>Redirect to user answers and results</p>}>
            <Button
            color="primary"
            size="large"
            onClick={handleViewResults}
            className={classes.button_st}>
                See answers
            </Button>
         </Tooltip>
</div> 
</Card>
      );
    
}

export default ResultCard
