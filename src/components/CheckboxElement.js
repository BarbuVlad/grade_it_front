import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import CheckboxSubElement from './CheckboxSubElement';

import { useState, useEffect } from "react";

const CheckboxElement = ({index, question, answersList}) => {

      return(
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
            <FormGroup>
                {answersList.map( (answer, index) => {
                   return(
                    <div key={index} style={{display:"flex", flexDirection:"row"}}>
                    <CheckboxSubElement key={index} answer={answer} color="primary"/>
                    <Typography variant="subtitle2" 
                    style={{alignSelf:"center"}}>
                      {answer["corect"]===true ? <div style={{color:"#60a358"}}>{`(corect)`}</div>
                       : 
                       <div style={{color:"#c46262"}}>{`(incorect)`}</div>}
                      
                      </Typography>
        
                    </div>
                    /*
                <FormControlLabel key={index}
                control={<Checkbox checked={valuesChecked[index]} onChange={(event,index)=>handleChange(event,index)} name="gilad" />}
                label="Gilad Gray"
                  />*/)
                })}

            </FormGroup>
          </FormControl>
        </div>       
      ) 
}

export default CheckboxElement