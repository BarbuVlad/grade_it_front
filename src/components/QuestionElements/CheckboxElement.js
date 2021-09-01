import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import CheckboxSubElement from './CheckboxSubElement';

import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {setAnswerSelected} from "../../redux/testCreator/questionsCreatorSlice"
const CheckboxElement = ({index, question, answersList}) => {

  const dispatch = useDispatch();
  const handleChangeCheckBox = (value_index) => {
    if(value_index!==undefined){
      dispatch(setAnswerSelected({'index_q':index, 'index_a':value_index}));
    }
    //console.log("Index:", i);
  };
      return(
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{color:"white"}}>{index+1}. {question}</FormLabel>
            <FormGroup>
                {answersList.map( (answer, index_) => {
                  //console.log(index_);
                   return(
                    <div key={index_} style={{display:"flex", flexDirection:"row"}}>
                    <CheckboxSubElement key={index_} index={index_} answer={answer} handlerReduxState={handleChangeCheckBox} color="primary"/>
        
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