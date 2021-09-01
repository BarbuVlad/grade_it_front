import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useState } from "react";

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import {setAnswerSelected} from "../../redux/testCreator/questionsCreatorSlice"
import {useSelector, useDispatch} from 'react-redux';
const CssRadio = withStyles({
    colorPrimary: {
        color: "grey",
        // '&$checked': {
        //     color: 'hotpink',
        //   },
    },
    checked: {}
})(Radio)

const RadiobuttonElement = ({index, question, answersList}) => {
  const [valueRadio, setValueRadio] = useState(null);
  const dispatch = useDispatch();
  //Methods 
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
    let i=false;
    for(i=0; i<answersList.length; i++){
      //console.log(answersList[i]["text"]);
      if(answersList[i]["text"]===event.target.value){
        break
      }
    }
    if(i!==false){
      dispatch(setAnswerSelected({'index_q':index, 'index_a':i}));
    }
    //console.log("Index:", i);
  };

    return(
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
          <RadioGroup aria-label="answer" name="answer" value={valueRadio} onChange={handleChangeRadio}>
          {answersList.map( (answer, key) => (
            <div style={{display:"flex", flexDirection:"row"}}>
            <FormControlLabel key={key} value={answer.text} control={<CssRadio color="primary"  />} label={answer.text} />
            </div>
          ))}
          </RadioGroup>
        </FormControl>
      </div>       
    ) 
}

export default RadiobuttonElement;