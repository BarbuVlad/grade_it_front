import { Typography, TextField } from "@material-ui/core"
import { useState } from "react"
import useStyles from '../../styles/testCreatorStyles';

import {setAnswerSelected} from "../../redux/testCreator/questionsCreatorSlice"
import {useSelector, useDispatch} from 'react-redux';
const TextAnswerElement = ({index, question}) => {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');
    const dispatch = useDispatch();

    const handleChangeRedux = (value) =>{
        dispatch(setAnswerSelected({'index_q':index, 'text':value}));
    }
    return (
        <div>
            <Typography>{index+1}.{question}</Typography>
            <TextField          
            id="outlined-basic" 
            label="" 
            variant="outlined"  
            color="primary"
            size="small" 
            placeholder="Your answer..."
            style={{marginBottom:"25px",color:"grey"}}
            onChange={(e)=>{setAnswer(e.target.value);handleChangeRedux(e.target.value)}}
            value={answer}
            //disabled
            InputProps={{
                className: classes.input_grey,
                classes: {
                    focused: classes.notchedOutline,
                    notchedOutline: {borderColor: "grey",borderWidth: 2},
                }
                }}
                />
        </div>
    )
}

export default TextAnswerElement
