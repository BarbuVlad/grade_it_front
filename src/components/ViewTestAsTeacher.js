
import { Button, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CheckboxElement from './CheckboxElement';
import RadiobuttonElement from './RadiobuttonElement';
import useStyles from '../styles/testCreatorStyles';

import { useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { setState } from "../redux/testCreator/questionsCreatorSlice";
import { setEditTest } from "../redux/editTestSlice";
import { setTestId } from "../redux/testIdToEditSlice";

const ViewTestAsTeacher = () => {
    const classes = useStyles();
    const testQuestions = useSelector(state=>state.questionsCreator);
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    const [owner, setOwner] = useState('');
    useEffect(()=>{
        /*Get all scheduled tests */

        const fetch_class_test = async () =>{
          try{
            const tests_fetch = await fetch(`http://192.168.206.129:5000/classes/view_test?test_id=${id}`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });
          const data = await tests_fetch.json(); 
         console.log(data);
          if(data["code"]==0){
            dispatch(setState(JSON.parse(data["questions"])));
            setOwner(data["owner"]);
            return;
          }
          else{///< no permision or error
            alert("This data does not exist or you have no right to view it");
            return;
          }

          } catch(err){
              alert("Can't fetch tests. Network error!");
              //setClassTests("Network error");
          }
      }
      fetch_class_test();

    },[]);

    const handleEditTest = () => {
        dispatch(setEditTest(true));
        dispatch(setTestId(id));
        history.push(`/app/classes/${localStorage.getItem("id_class")}/tests/create`);
    }

    return (
    <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
        <Typography variant="h5" color="primary"> Owner: {owner}</Typography>
        <Button 
        variant="outlined" 
        color="secondary" 
        style={{color:"#26a69a",borderColor:"#26a69a", maxWidth:150, marginTop:10}}
        onClick={handleEditTest}
         >
            <b>Edit test</b>
        </Button>
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
                            <Typography>{index+1}.{question_entry.question}</Typography>
                           <TextField          
                            id="outlined-basic" 
                            label="" 
                            variant="outlined"  
                            color="primary"
                            size="small" 
                            style={{marginBottom:"25px",color:"grey"}}
                            value={"Answer as text"}
                            //disabled
                            InputProps={{
                                className: classes.input_grey,
                                classes: {
                                  focused: classes.notchedOutline,
                                  notchedOutline: classes.notchedOutline,
                                }
                              }}
                             />
                        </div>
                        )//render
                default:
                    <div></div>
            }
        } )}
         </div>
    )
}

export default ViewTestAsTeacher
