import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useState } from "react";

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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

  //Methods 
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
    console.log("Val:",event.target.value)
  };

    return(
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
          <RadioGroup aria-label="answer" name="answer" value={valueRadio} onChange={handleChangeRadio}>
          {answersList.map( (answer, key) => (
            <div style={{display:"flex", flexDirection:"row"}}>
            <FormControlLabel key={key} value={answer.text} control={<CssRadio color="primary"  />} label={answer.text} />
            <Typography variant="subtitle2" 
            style={{alignSelf:"center"}}>
              
              {answer["corect"]===true ? <div style={{color:"#60a358"}}>{`(corect)`}</div>
               : 
               <div style={{color:"#c46262"}}>{`(incorect)`}</div>}
              
              </Typography>

            </div>
          ))}
          </RadioGroup>
        </FormControl>
      </div>       
    ) 
}

export default RadiobuttonElement;