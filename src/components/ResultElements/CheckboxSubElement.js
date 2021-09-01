import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useState} from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const CssCheckbox = withStyles({
    colorPrimary: {
        color: 'grey',
        // '&$checked': {
        //     color: 'hotpink',
        //   },
    },
    checked: {}
})(Checkbox)

const CheckboxSubElement = ({key,index,answer}) => {
    
    return (
        <>
        <FormControlLabel
        control={<CssCheckbox  
            checked={answer.selected?true:false} 
            name={answer.text} 
            color="primary"/>}
        label={answer.text}
            />
            {answer.right ? 
            <Typography variant="subtitle1" style={{textAlign:"center", display:"flex", alignItems:"center"}}> 
                {"->"} <b style={{color:"#7fcc7a"}}> corect</b>
            </Typography>
            :
            <Typography variant="subtitle1" style={{textAlign:"center", display:"flex", alignItems:"center"}}> 
                {"->"}   <b style={{color:"#cc7a7a"}}> wrong</b>
            </Typography>
            }

        </>
    )
}

export default CheckboxSubElement;