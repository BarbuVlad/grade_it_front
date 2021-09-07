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

const ScheduledTestCard = ({item}) => {
    const classes = useStyles();
    const [openScheduleDialog, setOpenScheduleDialog] = useState(false);///<

    const [dateStart, setDateStart] = useState('2021-09-24T12:00');
    const [dateEnd, setDateEnd] = useState('2021-09-24T12:05');
//new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    const [openScheduleSnackbar, setOpenScheduleSnackbar] = useState(false);
    const [scheduleTextSnackbar, setScheduleTextSnackbar] = useState('');
    const [scheduleSuccessSnackbar, setScheduleSuccessSnackbar] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const [testInFuture, setTestInFuture] = useState(true);
    const [diffDays, setDiffDays] = useState(0);

    const [empty, setEmpty] = useState([0]);
    const [renderType, setRenderType] = useState(false);///< 0-future test teacher, 1-future test student, 2-past test teacher, 3-past test student

    const handleViewTest = () => {
        history.push(location.pathname+`/manage/${item["id_test"]}`);
    }

    const handleSetSchedule = async () => {
        //console.log(dateStart, "-",dateEnd," id:",item);
        // return
        const fetch_set_schedule = async () => {
            const schedule_fetch = await fetch(`http://192.168.206.129:5000/classes/set_test_schedule`,{
                method: 'POST',
                headers:{"Content-Type": "application/json",
                        "x-auth-token": localStorage.getItem("token"),
                        "x-auth-token-class": localStorage.getItem("token_class")},
                body: JSON.stringify({"startDate":dateStart, "endDate":dateEnd, "testId":item["id_test"]})
                });
            const data = await schedule_fetch.json();
            if (data["code"] == 0){
                setOpenScheduleSnackbar(true);
                setScheduleTextSnackbar("Schedule was set!");
                setScheduleSuccessSnackbar(true);
            } else {
                setOpenScheduleSnackbar(true);
                setScheduleTextSnackbar(data["message"]);
                setScheduleSuccessSnackbar(false);
            }
      }
      fetch_set_schedule();
      //setOpenBlock(false);
      //handleCloseMenu();
    };
    const handleReSetSchedule = async () => {
        //console.log(dateStart, "-",dateEnd," id:",item);
        // return
        const fetch_set_schedule = async () => {
            const schedule_fetch = await fetch(`http://192.168.206.129:5000/classes/reset_test_schedule`,{
                method: 'POST',
                headers:{"Content-Type": "application/json",
                        "x-auth-token": localStorage.getItem("token"),
                        "x-auth-token-class": localStorage.getItem("token_class")},
                body: JSON.stringify({"startDate":dateStart, "endDate":dateEnd, "testId":item["id_test"]})
                });
            const data = await schedule_fetch.json();
            if (data["code"] == 0){
                setOpenScheduleSnackbar(true);
                setScheduleTextSnackbar("Schedule was re-set!");
                setScheduleSuccessSnackbar(true);
            } else {
                setOpenScheduleSnackbar(true);
                setScheduleTextSnackbar(data["message"]);
                setScheduleSuccessSnackbar(false);
            }
      }
      fetch_set_schedule();
      //setOpenBlock(false);
      //handleCloseMenu();
    };

    const handleViewAllResults = () => {
      history.push(location.pathname+`/view_all/${item["id_test"]}`);
    }
    const handleViewOwnResults = () => {
      history.push(location.pathname+`/view_own/${item["id_test"]}`);
    }
    const handleSolveTest = () => {
        localStorage.setItem("endDate", item["date_time_end"]);
        history.push(location.pathname+`/solve/${item["id_test"]}`);
    }


    useEffect(()=>{
        //Calculate if test was in the past or will be in the future
        const end = new Date(item["date_time_end"]);
        const today = new Date();
        const diffTime = Math.abs(today - end);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setDiffDays(diffDays);
        if(end>today){
            setTestInFuture(true);
        }else{
            setTestInFuture(false);
        }
        if(testInFuture===true && localStorage.getItem("role")!=="student"){
            setRenderType(0);
        }
        else if(testInFuture===true && localStorage.getItem("role")==="student"){
            setRenderType(1);
        }
        else if(testInFuture===false && localStorage.getItem("role")!=="student"){
            setRenderType(2);
        }
        else if(testInFuture===false && localStorage.getItem("role")==="student"){
            setRenderType(3);
        }
console.log(renderType, testInFuture,localStorage.getItem("role"))
    },[renderType]);

    if(renderType===false){
        return (<Backdrop className={classes.backdrop} open={renderType} onClick={()=>{setRenderType(true)}}>
            <CircularProgress color="inherit" />
          </Backdrop>)
    } else{
    return (
        <Card className={classes.root}>
        <CardContent className={classes.cardText}>
            <Typography variant="h6" align="center">
              {item["name"]}
              {/* Status: <ins>{item["role"]}</ins> */}
            </Typography>
            <br />
            <Typography style={{marginLeft:15}}component="p">{item["description"]}</Typography>
        <br/>
            <Typography style={{marginLeft:15}}component="p">Start at: <b> {item["date_time_start"].replace("T"," ")} </b></Typography>
            <Typography style={{marginLeft:15}}component="p">End at: <b> {item["date_time_end"].replace("T"," ")}</b></Typography>

            <Typography style={{marginLeft:15}}component="p">
                {testInFuture ? `Test ends in ${diffDays} days` : `Test was ${diffDays} days ago`}
            </Typography>
          </CardContent>


<div style={{display:"flex", flexDirection:"row",alignItems:"flex-end", justifyContent:"flex-end"}}>

{empty.map( () => {
    switch(renderType){
        case 1:
        return(
          <Tooltip title={<p style={{fontSize:12}}>Redirect to solve test</p>}>
            <Button
            color="primary"
            size="large"
            onClick={handleSolveTest}
            className={classes.button_st}>
                Solve Test
            </Button>
         </Tooltip>
        )

case 0:
    return(
<>
          <Tooltip title={<p style={{fontSize:12}}>Redirect to view test questions and answers</p>}>
            <Button
            color="primary"
            size="large"
            onClick={handleViewTest}
            className={classes.button_action_confirm}>
                View test
            </Button>
           </Tooltip>

           <Tooltip title={<p style={{fontSize:12}}>Schedule a date for examination</p>}>
          <Button 
          color="secondary" 
          size="large"
          onClick={()=>{setOpenScheduleDialog(true)}}
          className={classes.button_action_sch}
          >
            RE-Schedule
        </Button>
        </Tooltip>
    </>
    )
case 2:
    return(<>
        <Tooltip title={<p style={{fontSize:12}}>Redirect to see students answers</p>}>
            <Button
            color="primary"
            size="large"
            onClick={handleViewAllResults}
            className={classes.button_st}>
                See All results
            </Button>
         </Tooltip>
    
    
    </>)
case 3: 
    return(<>
        <Tooltip title={<p style={{fontSize:12}}>Redirect to own results</p>}>
            <Button
            color="primary"
            size="large"
            onClick={handleViewOwnResults}
            className={classes.button_st}>
                See own results
            </Button>
        </Tooltip>
    
    </>)
default: 
    <></>
           }
        } )}
</div>
        

        {/* Dialog for inviting a student */}
        <Dialog
              open={openScheduleDialog}
              onClose={()=>{setOpenScheduleDialog(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogContent>
              <Typography variant="h5" style={{textAlign:"center"}}>
                 Please select a window of time in which the students can solve the test. 
                </Typography >
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <form className={classes.container} noValidate>
                        <CssTextField
                           // id="datetime-local"
                            id="validation-outlined-input"
                            variant="outlined"
                            fullWidth
                            label="Start at"
                            type="datetime-local"
                            //defaultValue="2021-09-24T12:00"
                            value={dateStart}
                            onChange={(e)=>setDateStart(e.target.value)}
                            className={classes.textField}
                            InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                shrink: true,
                                classes: {
                                  root: classes.cssLabel,
                                 // focused: classes.cssFocused,
                                },
                              }}
                        />
                    </form>
                              
                    <form className={classes.container} noValidate>
                        <CssTextField
                           // id="datetime-local"
                            id="validation-outlined-input"
                            variant="outlined"
                            fullWidth
                            label="End at"
                            type="datetime-local"
                            //defaultValue="2021-09-24T12:05"
                            value={dateEnd}
                            onChange={(e)=>setDateEnd(e.target.value)}
                            className={classes.textField}
                            InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                shrink: true,
                                classes: {
                                  root: classes.cssLabel,
                                 // focused: classes.cssFocused,
                                },
                              }}
                        />
                    </form>

                    <Button
                    variant="contained" 
                    color="secondary"
                    className={classes.btn}
                    onClick={handleReSetSchedule}
                    // size="large"
                    >
                        re-Set date
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
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={openScheduleSnackbar}
              autoHideDuration={4500}
              onClose={()=>setOpenScheduleSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setOpenScheduleSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={scheduleSuccessSnackbar ? "success" : "error"}
                onClose={()=>setOpenScheduleSnackbar(false)}>
                  {scheduleTextSnackbar}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}

        </Card>
      );
            }
}

export default ScheduledTestCard
