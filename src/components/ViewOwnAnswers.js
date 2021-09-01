
import { Button, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CheckboxElement from './ResultElements/CheckboxElement';
import RadiobuttonElement from './ResultElements/RadiobuttonElement';
import useStyles from '../styles/testCreatorStyles';

import { useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { setState } from "../redux/testCreator/questionsCreatorSlice";
import { setEditTest } from "../redux/editTestSlice";
import { setTestId } from "../redux/testIdToEditSlice";

const ViewOwnAnswers = () => {
    //const testQuestions = useSelector(state=>state.questionsCreator);
    const[testQuestions, setTestQuestions] = useState([]);
    let { id } = useParams();

    const [render, setRender] = useState(false);
    useEffect(()=>{
        /*Get all own results for this test id */

        const fetch_result = async () =>{
          try{
            const results_fetch = await fetch(`http://192.168.206.129:5000/classes/view_own_results?test_id=${id}`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });
          const data = await results_fetch.json(); 
         console.log(data);
          if(data["code"]==0){
            setTestQuestions(JSON.parse(data["results"]));
            setRender(true);
            return;
          }
          else{///< no permision or error
            alert("This data does not exist or you have no right to view it");
            setRender(true);
            return;
          }

          } catch(err){
              alert("Can't fetch tests. Network error!");
              setRender(true);
              //setClassTests("Network error");
          }
      }
      fetch_result();

    },[]);

if(!render){
    return (
        <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
            <Typography variant="h5" color="primary"> No data</Typography>
    </div>
    )
}else{
    return (
    <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
        <Typography variant="h5" color="primary"> Results</Typography>

        {testQuestions.map( (question_entry, index) => {
            switch(question_entry.type){
                case "radiobuttons":
                    return(
                    <div key={index} style={{ marginTop:"20px"}}>
                        <RadiobuttonElement 
                        index={index} 
                        question={question_entry.question} 
                        answersList={question_entry.answersList}  
                        />
                    </div>
                    )//render
                case "checkboxes":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                            <CheckboxElement
                            index={index} 
                            question={question_entry.question} 
                            answersList={question_entry.answersList}  />
                        </div>
                        )//render
                case "text":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                            <Typography>{index+1}.{question_entry.question}</Typography>
                            <Typography><i>{question_entry.answer}</i></Typography>
                        </div>
                        )//render
                default:
                    <div></div>
            }
        } )}
         </div>
    )
}
}

export default ViewOwnAnswers
