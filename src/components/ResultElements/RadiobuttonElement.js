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

    return(
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
          <RadioGroup aria-label="answer" name="answer" >
          {answersList.map( (answer, key) => (
            <div style={{display:"flex", flexDirection:"row"}}>
            <FormControlLabel key={key} value={answer.text} control={<CssRadio checked={answer.selected} color="primary"  />} label={answer.text} />
            {answer.right ? 
            <Typography variant="subtitle1" style={{textAlign:"center", display:"flex", alignItems:"center"}}> 
                {"->"} <b style={{color:"#7fcc7a"}}> corect</b>
            </Typography>
            :
            <Typography variant="subtitle1" style={{textAlign:"center", display:"flex", alignItems:"center"}}> 
                {"->"}   <b style={{color:"#cc7a7a"}}> wrong</b>
            </Typography>
            }
            </div>
          ))}
          </RadioGroup>
        </FormControl>
      </div>       
    ) 
}

export default RadiobuttonElement;