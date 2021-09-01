
import { Button, TextField, Tooltip, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CheckboxElement from '../../../components/QuestionElements/CheckboxElement';
import RadiobuttonElement from '../../../components/QuestionElements/RadiobuttonElement';
import TextAnswerElement from '../../../components/QuestionElements/TextAnswerElement';
import useStyles from '../../../styles/testCreatorStyles';

import { useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { setState } from "../../../redux/testCreator/questionsCreatorSlice";
import { setEditTest } from "../../../redux/editTestSlice";
import { setTestId } from "../../../redux/testIdToEditSlice";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SolveTest = () => {
    const classes = useStyles();
    const testQuestions = useSelector(state=>state.questionsCreator);
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    const [testToken, setTestToken] = useState('');

    const [postActionSnackbar, setPostActionSnackbar] = useState(false);
    const [postTextSnackbar, setPostTextSnackbar] = useState('');
    const [postSuccessSnackbar, setPostSuccessSnackbar] = useState(false);

    useEffect(()=>{
        /*Get all scheduled tests */

        const fetch_class_test = async () =>{
          try{
            const tests_fetch = await fetch(`http://192.168.206.129:5000/classes/get_test_to_solve?test_id=${id}`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });
          const data = await tests_fetch.json(); 
         console.log("Hello",data);
          if(data["code"]==0){
            dispatch(setState(data["questions"]));
            setTestToken(data["token"]);
            return;
          }
          else{///< no permision or error
            alert("This data does not exist or you have no right to view it");
            return;
          }
        } catch(err){
            alert("Can't fetch test questions. Network error!");
            console.log(err);
            //setClassTests("Network error");
        }
      }
      fetch_class_test();

    },[]);

    const handleSendTestAnswers =  async () => {
        try{
            const send_fetch = await fetch(`http://192.168.206.129:5000/classes/send_test_answers`, {
              method: 'POST',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
            },
           body: JSON.stringify({"token":testToken, "answers":testQuestions})
          });
          const data = await send_fetch.json(); 
          console.log("Send:", testQuestions);
          if(data["code"]==0){
            setPostTextSnackbar(`Answers sent successfully!`);
            setPostActionSnackbar(true);
            setPostSuccessSnackbar(true);
            return;
          }
          else{
            //alert("This data does not exist or you have no right to view it");
            setPostTextSnackbar(data["message"]);
            setPostActionSnackbar(true);
            setPostSuccessSnackbar(false);
            return;
          }

        } catch(err){
            alert("Can't send. Network error!");
        }
    }

    return (
    <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
        <Typography variant="h5" color="primary"> Send until  {localStorage.getItem("endDate").replace("T", " ")}</Typography>
        <Tooltip title={<p style={{fontSize:14, color:"#ff6969"}}>You can send only once! Be careful</p>}>
            <Button 
            variant="outlined" 
            color="secondary" 
            style={{color:"#26a69a",borderColor:"#26a69a", maxWidth:150, marginTop:10}}
            onClick={handleSendTestAnswers}
            >
                <b>Send test answers</b>
            </Button>
        </Tooltip>

        {testQuestions.map( (question_entry, index) => {
            switch(question_entry.type){
                case "radiobuttons":
                    return(
                    <div key={index} style={{ marginTop:"20px"}}>
                        <RadiobuttonElement index={index} question={question_entry.question} answersList={question_entry.answersList}  />
                    </div>
                    )//render
                case "checkboxes":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                            <CheckboxElement index={index} question={question_entry.question} answersList={question_entry.answersList}  />
                        </div>
                        )//render
                case "text":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                             <TextAnswerElement index={index} question={question_entry.question}/>
                        </div>
                        )//render
                default:
                    <div></div>
            }
        } )}

                    {/*Snackbar for class creation success / for join class success */}
                    <Snackbar
              classes={{root:classes.snackbar_success}}
              anchorOrigin={{
                vertical: 'top',
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
    </div>
    )
}

export default SolveTest
