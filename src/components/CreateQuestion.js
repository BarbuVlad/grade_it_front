import { Typography, Button, TextField,Menu, MenuItem} from "@material-ui/core";

import useStyles from '../styles/testCreatorStyles';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useState } from "react";

import AnswerBox from "./AnswerBox";

//Redux-store imports
import {useSelector, useDispatch} from 'react-redux';

import { addAnswer, removeAnswer, resetAnswers,  setAnswerText,setAnswerCorect } from "../redux/testCreator/answersListSlice";
import { changeQuestionText, resetQuestionText } from "../redux/testCreator/questionTextSlice";
import { changeAnswersType } from "../redux/testCreator/answersTypeSlice";
import { addQuestion } from "../redux/testCreator/questionsCreatorSlice";


import {
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from '@material-ui/core/styles';
const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'grey',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      
    },
  },
})(TextField);

// import {add, remove, resetAnswers,//List answers actions
//         changeQuestion, resetQuestion, //Question text actions
//         changeType,//Answers type actions
//         addQuestionToTest} from '../actions';

const CreateQuestion = () => {
    const classes=useStyles();
    //import a state from redux
    const answersList = useSelector(state => state.answersList);
    const questionText = useSelector(state => state.questionText);
    const answersType = useSelector(state=>state.answersType);
  
    const testQuestions = useSelector(state=>state.questionsCreator);
  
    const dispatch = useDispatch();
  
    const [questionTextError, setQuestionTextError] = useState(false);
    const [addAnswerDisable,setAddAnswerDisable] = useState(false);
  //maxHeight="xl"
  
  const setTextValue = (e) =>{
    e.preventDefault();
    dispatch(changeQuestionText(e.target.value));
   // console.log(answersList[label_number]);
  }
  
  const saveQuestion = () => {
    //verify
    if(questionText==''){
      alert("Question text can't be empty!"); 
      setQuestionTextError(true);
      return;
    }
    if(answersList.length == 0 && answersType!="text"){alert("There must be at least 1 answer");return;}
    let stop = false;
    answersList.map( (answer,index) => {
     if( answer["text"]==null ){
      alert(`Answer ${index+1} can't be empty`);
      stop=true;
     } else if (answer["text"].replaceAll(" ", "")===""){
      alert(`Answer ${index+1} can't be empty`);
      stop=true;
     }

    });
    if(stop){return;}
  
    let entry = {question:questionText, type:answersType, answersList:answersList};
    dispatch(addQuestion(entry));
    //reset current question fields
    dispatch(resetQuestionText());
    dispatch(resetAnswers());
    setQuestionTextError(false);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseRadio = () => {
    dispatch(changeAnswersType("radiobuttons"));
    setAddAnswerDisable(false);
    setAnchorEl(null);
  };
  const handleCloseCheckbox = () => {
    dispatch(changeAnswersType("checkboxes"));
    setAddAnswerDisable(false);
    setAnchorEl(null);
  };
  const handleCloseText = () => {
    dispatch(changeAnswersType("text"));
    dispatch(resetAnswers());
    setAddAnswerDisable(true);
    setAnchorEl(null);
  };
    return (
    <>
        {/* <Typography variant="h5" align="left" gutterBottom className={classes.form_title}>Create a new Question</Typography> */}

        <form className={classes.form}>
             <CssTextField id="custom-css-outlined-input" label="Specify the question..." 
            value={questionText}
            onChange={(e)=>setTextValue(e)}
            style={{width:"85%", borderColor:"grey", color:"grey"}}
            multiline
            error={questionTextError}
            InputProps={{
              className: classes.input,
              classes: {
                focused: classes.notchedOutline,
                notchedOutline: classes.notchedOutline,
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            // OutlinedInputProps={{
            //     classes:{
            //         root: classes.cssFocused,
            //     }
            //}}
             />


             <Button variant="outlined" style={{marginTop:"9px", marginLeft:"30px", color:"white", borderColor:"grey"}} 
             disabled={addAnswerDisable}
             onClick={() => dispatch(addAnswer({text:null, corect:false}))}
             >Add answer</Button>

             {/*Menu for selecting type*/}
             <div style={{marginTop:"9px", marginLeft:"5px"}}>
             <Button 
             startIcon={<KeyboardArrowDownIcon/>} 
             aria-controls="simple-menu" 
             aria-haspopup="true" 
             onClick={handleClick}
             style={{color:"white"}}>
              Answers type: {answersType}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              
            >
              <MenuItem onClick={handleCloseRadio}>Radio buttons</MenuItem>
              <MenuItem onClick={handleCloseCheckbox}>Checkboxes</MenuItem>
              <MenuItem onClick={handleCloseText}>Text</MenuItem>
            </Menu>
            </div>

             
            <div style={{flexDirection: "column"}}>
                {answersList.map( (answer, no) => 
                  (<AnswerBox label_number={no} key={no} answer={answer}/>)
                  )}
            </div>

              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                onClick={() => dispatch(removeAnswer())}
                disabled={answersType === "text"? true:false}
                style={{
                  marginTop: "30px",
                  marginButtom: "15px",
                  marginLeft: "15px",
                  marginRight:"15px",
                  backgroundColor:"#333333",
                  color:"#b5b5b5",
                }}
                >
                  Remove last answer
                </Button>
<br/>
                <Button
                startIcon={<SaveIcon />}
                variant="outlined"
                onClick={()=>saveQuestion()}
                color="primary"
                style={{
                  marginTop: "30px",
                  marginButtom: "15px",
                  marginLeft: "15px",
                  marginRight:"15px"
                }}
                >
                  Save question!
                </Button>

          </form>
 </>

    );
}

export default CreateQuestion;