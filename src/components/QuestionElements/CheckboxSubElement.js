import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useState} from "react";
import { withStyles } from '@material-ui/core/styles';
const CssCheckbox = withStyles({
    colorPrimary: {
        color: 'grey',
        // '&$checked': {
        //     color: 'hotpink',
        //   },
    },
    checked: {}
})(Checkbox)

const CheckboxSubElement = ({key,index,answer,handlerReduxState}) => {
    const [value, setValue] = useState(false);


    const handleChange = (event) => {
        //console.log(index);
        setValue(event.target.checked);
        handlerReduxState(index);
      };
    
    return (
        <FormControlLabel
        control={<CssCheckbox checked={value} onChange={handleChange} name={answer.text} color="primary"/>}
        label={answer.text}
            />
        
    )
}

export default CheckboxSubElement;