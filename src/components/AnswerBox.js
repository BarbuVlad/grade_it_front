import { TextField, ThemeProvider,createMuiTheme, FormControlLabel, Checkbox,Container} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { useState } from "react";
import PropTypes from 'prop-types';

import useStyles from '../styles/testCreatorStyles';

import {useSelector,useDispatch} from 'react-redux';

import {setAnswerText,setAnswerCorect} from '../redux/testCreator/answersListSlice';
import { withStyles } from '@material-ui/core/styles';
const CssCheckbox = withStyles({
    colorPrimary: {
        color: "grey",
        // '&$checked': {
        //     color: 'hotpink',
        //   },
    },
    checked: {}
})(Checkbox)

const AnswerBox = ({label_number, answer}) => {
    const classes=useStyles();
    const [answerCheck, setAnswerCheck] = useState(answer.corect);
    const answersList = useSelector(state => state.answersList);
    
    const dispatch = useDispatch();
  
    const theme = createMuiTheme({
      palette: {
        primary: grey,
        
      },
      // overrides: {
      //   MuiCheckbox: {
      //     colorSecondary: {
      //       color: 'grey',
      //       '&$checked': {
      //         color: 'grey',
      //       },
      //     },
      //   },
      // },
    });

    //event handler
    const setCheck = (e) =>{
        setAnswerCheck(e.target.checked);
        dispatch(setAnswerCorect({'id':label_number,'bool':e.target.checked}));
        //console.log(answersList[label_number]);
    }

    const setTextValue = (e) =>{
        e.preventDefault();
        //console.log("BOX:", label_number, "---><", e.target.value)
        dispatch(setAnswerText({'id':label_number,'text':e.target.value}));
       // console.log(answersList[label_number]);
    }


    return (
        <Container>
            
        <ThemeProvider theme={theme}>
            <TextField 
            id="outlined-basic" 
            label={"Answer " + (label_number+1)} 
            variant="outlined"  
            size="small" 
            className={classes.answer} 
            InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                 // focused: classes.cssFocused,
                },
              }}
            //   OutlinedInputProps={{
            //       classes:{
            //           root: classes.cssFocused,
            //       }
            //   }}
            value={answer.text ? answer.text : ''}
            onChange={(e)=>setTextValue(e)}
            multiline
            />
        </ThemeProvider>

        <FormControlLabel className={classes.answer_checkbox}
            control={<CssCheckbox  checked={answerCheck} onChange={(e)=>setCheck(e)} name="corect" color="primary" />}
            label="Corect" 
        />

        </Container>
    )
}

AnswerBox.defaultProps = {
    label_number: 0,
}


export default AnswerBox;